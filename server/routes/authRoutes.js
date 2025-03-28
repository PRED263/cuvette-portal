const express = require('express');
const { signup, login, getUser } = require('../controller/User');
const { createEmployer, loginEmployer, getEmployer } = require('../controller/Employer');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// User routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/user', authMiddleware, getUser);

// Employer routes
router.post('/employer/signup', createEmployer);
router.post('/employer/login', loginEmployer);
router.get('/employer', authMiddleware, getEmployer);

module.exports = router;