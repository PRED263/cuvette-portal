require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URL;
console.log('Attempting to connect with URL:', uri.replace(/:[^:]*@/, ':****@'));

mongoose.connect(uri)
  .then(() => {
    console.log('Connected successfully to MongoDB');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  }); 