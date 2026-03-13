const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const demoData = require('../demoData');

// GET /api/crops - Fetch all crops (falls back to demo data if DB fails)
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find().sort({ name: 1 });
    res.json(crops);
  } catch (err) {
    console.warn('DB unavailable, serving demo crops');
    res.json(demoData.crops);
  }
});

module.exports = router;
