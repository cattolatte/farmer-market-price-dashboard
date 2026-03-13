const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  baseline_price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Crop', cropSchema);
