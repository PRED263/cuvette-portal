require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/connection');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/JobRoutes');
const cors = require('cors');

// Import models to ensure they're registered
require('./model/relationships');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req, res) => {
    res.send("Hello From Server");
});

app.use('/api', authRoutes);
app.use('/jobs', jobRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});