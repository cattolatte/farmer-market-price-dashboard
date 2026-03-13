const express = require('express');
const router = express.Router();
const Mandi = require('../models/Mandi');
const demoData = require('../demoData');

// GET /api/mandis - Fetch all mandis (falls back to demo data if DB fails)
router.get('/', async (req, res) => {
  try {
    const mandis = await Mandi.find().sort({ name: 1 });
    res.json(mandis);
  } catch (err) {
    console.warn('DB unavailable, serving demo mandis');
    res.json(demoData.mandis);
  }
});

module.exports = router;
