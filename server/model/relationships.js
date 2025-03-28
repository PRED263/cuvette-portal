const User = require('./User');
const Job = require('./Job');
const Employer = require('./Employer');
const Application = require('./Application');

// Employer - Job relationship
Employer.hasMany(Job, { foreignKey: 'createdBy' });
Job.belongsTo(Employer, { foreignKey: 'createdBy' });

// User - Application - Job relationships
User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

Job.hasMany(Application, { foreignKey: 'jobId' });
Application.belongsTo(Job, { foreignKey: 'jobId' });

module.exports = { User, Job, Employer, Application }; 