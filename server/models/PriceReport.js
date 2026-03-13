const mongoose = require('mongoose');

const priceReportSchema = new mongoose.Schema({
  mandi_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mandi',
    required: true
  },
  crop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    required: true
  },
  reported_price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  receipt_image_url: {
    type: String,
    default: ''
  },
  has_receipt: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PriceReport', priceReportSchema);
