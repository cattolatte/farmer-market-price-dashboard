const express = require('express');
const router = express.Router();
const Mandi = require('../models/Mandi');

// GET /api/mandis - Fetch all mandis
router.get('/', async (req, res) => {
  try {
    const mandis = await Mandi.find().sort({ name: 1 });
    res.json(mandis);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch mandis' });
  }
});

module.exports = router;
