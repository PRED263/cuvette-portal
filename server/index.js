require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/connection');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/JobRoutes');
const cors = require('cors');
const { sequelize } = require('./db/connection');
const seedDatabase = require('./seed');

// Import models to ensure they're registered
require('./model/relationships');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Initialize database and seed data
const initializeDatabase = async () => {
    try {
        await connectDB();
        // Force sync to recreate tables
        await sequelize.sync({ force: true });
        console.log('Database synchronized!');
        
        // Run seed script
        await seedDatabase();
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Database initialization error:', error);
        // Don't throw the error, just log it
        // This allows the server to start even if seeding fails
    }
};

// Initialize database
initializeDatabase();

// Routes
app.use('/api', authRoutes);
app.use('/jobs', jobRoutes);

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ 
        status: "ok", 
        message: "Server is running",
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: "error", 
        message: "Something went wrong!",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});