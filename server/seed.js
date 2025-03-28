const { User, Employer, Job, Application } = require('./model/relationships');
const { sequelize } = require('./db/connection');

const seedDatabase = async () => {
    try {
        // Create sample users
        const users = await Promise.all([
            User.create({
                name: 'Rahul Sharma',
                email: 'rahul.sharma@gmail.com',
                password: 'password123',
                phone: '9876543210'
            }),
            User.create({
                name: 'Priya Patel',
                email: 'priya.patel@gmail.com',
                password: 'password123',
                phone: '8765432109'
            })
        ]);
        console.log('Users created');

        // Create sample employers
        const employers = await Promise.all([
            Employer.create({
                name: 'Infosys Technologies',
                email: 'careers@infosys.com',
                password: 'password123',
                company: 'Infosys Limited',
                phone: '9876543210'
            }),
            Employer.create({
                name: 'Tata Consultancy Services',
                email: 'careers@tcs.com',
                password: 'password123',
                company: 'TCS',
                phone: '8765432109'
            })
        ]);
        console.log('Employers created');

        // Create sample jobs
        const jobs = await Promise.all([
            Job.create({
                title: 'Frontend Developer',
                location: 'Bangalore',
                tech: ['React', 'JavaScript', 'HTML', 'CSS'],
                package: '8-12 LPA',
                startdate: new Date(),
                openings: 2,
                experience: '1-3',
                type: 'Full-time',
                officeType: 'Hybrid',
                createdBy: employers[0].id
            }),
            Job.create({
                title: 'Backend Developer',
                location: 'Mumbai',
                tech: ['Node.js', 'Express', 'MongoDB', 'SQL'],
                package: '10-15 LPA',
                startdate: new Date(),
                openings: 3,
                experience: '2-4',
                type: 'Full-time',
                officeType: 'In-Office',
                createdBy: employers[1].id
            }),
            Job.create({
                title: 'UI/UX Designer',
                location: 'Delhi',
                tech: ['Figma', 'Adobe XD', 'UI/UX', 'Prototyping'],
                package: '6-10 LPA',
                startdate: new Date(),
                openings: 1,
                experience: '1-2',
                type: 'Full-time',
                officeType: 'Hybrid',
                createdBy: employers[0].id
            })
        ]);
        console.log('Jobs created');

        // Create sample applications
        await Promise.all([
            Application.create({
                userId: users[0].id,
                jobId: jobs[0].id,
                appliedAt: new Date()
            }),
            Application.create({
                userId: users[1].id,
                jobId: jobs[1].id,
                appliedAt: new Date()
            })
        ]);
        console.log('Applications created');

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
};

module.exports = seedDatabase; 