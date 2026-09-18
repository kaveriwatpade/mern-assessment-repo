require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Result = require('./models/Result');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-assessment';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes

// 1. Save Result
app.post('/api/results/save', async (req, res) => {
  try {
    const { dob, data } = req.body;
    
    if (!dob || !data) {
      return res.status(400).json({ error: 'DOB and calculation data are required' });
    }

    const newResult = new Result({
      dob,
      dominantParent: data.dominantParent,
      motherTotal: data.motherTotal,
      fatherTotal: data.fatherTotal,
      grandTotal: data.grandTotal,
      factors: data.factors
    });

    await newResult.save();
    res.status(201).json({ message: 'Result saved successfully', result: newResult });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Server error while saving result' });
  }
});

// 2. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
