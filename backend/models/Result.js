const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  dob: {
    type: String,
    required: true,
  },
  dominantParent: {
    type: String,
    required: true,
  },
  motherTotal: {
    type: Number,
    required: true,
  },
  fatherTotal: {
    type: Number,
    required: true,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  factors: [
    {
      id: String,
      name: String,
      mother: Number,
      father: Number,
      total: Number,
      min: Number,
      max: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
