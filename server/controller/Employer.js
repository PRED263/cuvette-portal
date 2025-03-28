const { Employer } = require('../model/relationships');
const jwt = require('jsonwebtoken');

const createEmployer = async (req, res) => {
    const { name, email, password, company, phone } = req.body;

    try {
        const existingEmployer = await Employer.findOne({ where: { email } });
        if (existingEmployer) {
            return res.status(400).json({ message: 'Employer already exists' });
        }

        const newEmployer = await Employer.create({ name, email, password, company, phone });
        const token = jwt.sign({ email: newEmployer.email, id: newEmployer.id }, 'your_secret_key', { expiresIn: '1h' });
        res.status(201).json({ result: newEmployer, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.error(error);
    }
};

const loginEmployer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingEmployer = await Employer.findOne({ where: { email } });
        if (!existingEmployer) {
            return res.status(404).json({ message: 'Employer not found' });
        }

        if (existingEmployer.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: existingEmployer.email, id: existingEmployer.id }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ result: existingEmployer, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.error(error);
    }
};

const getEmployer = async (req, res) => {
    try {
        const employer = await Employer.findByPk(req.userId);
        if (!employer) {
            return res.status(404).json({ message: 'Employer not found' });
        }
        res.status(200).json({ result: employer });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { createEmployer, loginEmployer, getEmployer };