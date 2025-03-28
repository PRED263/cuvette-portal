const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const Application = sequelize.define('Application', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        allowNull: false
    },
    jobId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Jobs',
            key: 'id'
        },
        allowNull: false
    },
    appliedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true
});

module.exports = Application;