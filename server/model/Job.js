const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const Job = sequelize.define('Job', {
    title: {
        type: DataTypes.STRING,
        defaultValue: "Untitled Job"
    },
    location: {
        type: DataTypes.STRING,
        defaultValue: "Remote"
    },
    tech: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    package: {
        type: DataTypes.STRING
    },
    startdate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    openings: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    experience: {
        type: DataTypes.STRING,
        defaultValue: "Any"
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: "Full-time"
    },
    officeType: {
        type: DataTypes.ENUM('Remote', 'In-Office', 'Hybrid'),
        defaultValue: 'Hybrid'
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Employers',
            key: 'id'
        }
    }
}, {
    timestamps: true
});

module.exports = Job;