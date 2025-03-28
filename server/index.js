require('dotenv').config();
const express = require('express');
const { connectDB, sequelize } = require('./db/connection');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/JobRoutes');
const cors = require('cors');
const seedDatabase = require('./seed');
const path = require('path');

// Import models to ensure they're registered
require('./model/relationships');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the src directory
app.use(express.static(path.join(__dirname, '../src')));
app.use('/public', express.static(path.join(__dirname, '../public')));

// Initialize database and seed data
const initializeDatabase = async () => {
    try {
        await connectDB();
        // Only seed if the database is empty
        const User = require('./model/User');
        const userCount = await User.count();
        if (userCount === 0) {
            await seedDatabase();
            console.log('Database seeded successfully!');
        }
    } catch (error) {
        console.error('Database initialization error:', error);
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

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
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