const express = require('express');
const { handleCreateJob, handleViewJobs, handleApplyJob, handleViewAppliedJobs, handleGetEmployerJobs } = require('../controller/Job');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, handleViewJobs);
router.post('/createjob', authMiddleware, handleCreateJob);
router.post('/apply', authMiddleware, handleApplyJob);
router.get('/applied', authMiddleware, handleViewAppliedJobs);
router.get('/employer/jobs', authMiddleware, handleGetEmployerJobs);

module.exports = router;