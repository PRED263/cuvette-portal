const { Job, Application, User, Employer } = require('../model/relationships');
const { Op } = require('sequelize');

const handleCreateJob = async (req, res) => {
    try {
        const { title, location, tech, package: pkg, startdate, openings, experience, type, officeType } = req.body;

        if (!title || !location || !tech || !pkg || !startdate || !openings || !experience || !type || !officeType) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        const newJob = await Job.create({
            title,
            location,
            tech: Array.isArray(tech) ? tech : tech.split(',').map(t => t.trim()),
            package: pkg,
            startdate,
            openings,
            experience,
            type,
            officeType,
            createdBy: req.userId
        });

        res.status(201).json({
            message: "Job created successfully",
            job: newJob
        });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ message: "An error occurred while creating the job." });
    }
};

const handleViewJobs = async (req, res) => {
    try {
        const { type, search, minSalary, experience, sort, officeType } = req.query;
        const userId = req.userId;

        // Get user's applications
        const applications = await Application.findAll({ 
            where: { userId },
            attributes: ['jobId']
        });
        const appliedJobIds = applications.map(app => app.jobId);

        // Build query
        const where = {};
        if (type) where.type = type;
        if (officeType) where.officeType = officeType;
        if (search) {
            where[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { tech: { [Op.like]: `%${search}%` } }
            ];
        }
        if (minSalary) {
            where.package = { [Op.gte]: minSalary };
        }
        if (experience) {
            where.experience = { [Op.like]: `%${experience}%` };
        }

        // Build sort options
        let order = [];
        if (sort) {
            switch (sort) {
                case 'date-desc': order = [['createdAt', 'DESC']]; break;
                case 'date-asc': order = [['createdAt', 'ASC']]; break;
                case 'salary-desc': order = [['package', 'DESC']]; break;
                case 'salary-asc': order = [['package', 'ASC']]; break;
                default: order = [['createdAt', 'DESC']];
            }
        }

        // Fetch jobs with employer info
        const jobs = await Job.findAll({
            where,
            order,
            include: [{
                model: Employer,
                attributes: ['name', 'company']
            }]
        });

        // Add applicant count and format response
        const jobsWithCount = await Promise.all(jobs.map(async (job) => {
            const applicantCount = await Application.count({ where: { jobId: job.id } });
            const plainJob = job.get({ plain: true });
            return {
                ...plainJob,
                company: plainJob.Employer?.company || 'Unknown Company',
                employerName: plainJob.Employer?.name || 'Unknown Employer',
                applicants: applicantCount,
                isApplied: appliedJobIds.includes(job.id)
            };
        }));

        res.status(200).json({ jobs: jobsWithCount });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const handleApplyJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.userId;

        // Check if the job exists
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if the user has already applied
        const existingApplication = await Application.findOne({ 
            where: { userId, jobId }
        });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        // Create new application
        await Application.create({ userId, jobId });

        res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).json({ message: 'An error occurred while applying for the job' });
    }
};

const handleViewAppliedJobs = async (req, res) => {
    try {
        const userId = req.userId;

        // Fetch applications with job details
        const applications = await Application.findAll({
            where: { userId },
            include: [{
                model: Job,
                include: [{
                    model: Employer,
                    attributes: ['name']
                }]
            }],
            raw: true
        });

        // Extract job details
        const appliedJobs = applications.map(app => app.Job);

        res.status(200).json({ jobs: appliedJobs });
    } catch (error) {
        console.error('Error fetching applied jobs:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const handleGetEmployerJobs = async (req, res) => {
    try {
        const employerId = req.userId;
        
        // Fetch jobs with applications
        const jobs = await Job.findAll({
            where: { createdBy: employerId },
            include: [{
                model: Employer,
                attributes: ['name', 'company']
            }],
            raw: true,
            nest: true
        });

        // Fetch applications for each job
        const jobsWithApplications = await Promise.all(jobs.map(async (job) => {
            const applications = await Application.findAll({
                where: { jobId: job.id },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }],
                raw: true,
                nest: true
            });

            return {
                ...job,
                applications: applications.map(app => ({
                    applicantName: app.User.name,
                    applicantEmail: app.User.email,
                    appliedAt: app.appliedAt
                }))
            };
        }));

        res.status(200).json({ jobs: jobsWithApplications });
    } catch (error) {
        console.error('Error fetching employer jobs:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { 
    handleCreateJob, 
    handleViewJobs, 
    handleApplyJob, 
    handleViewAppliedJobs, 
    handleGetEmployerJobs
};