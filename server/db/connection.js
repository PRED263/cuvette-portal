const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false // Set to console.log to see SQL queries
});

const connectDB = async () => {
    try {
        console.log('Attempting to connect to SQLite database...');
        await sequelize.authenticate();
        console.log('SQLite Connected Successfully!');
        
        // Sync all models with database
        await sequelize.sync();
        console.log('Database synchronized!');
    } catch (error) {
        console.error('SQLite connection error:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };