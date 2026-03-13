const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

// GET /api/crops - Fetch all crops
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find().sort({ name: 1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
});

module.exports = router;
