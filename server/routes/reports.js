const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PriceReport = require('../models/PriceReport');
const Crop = require('../models/Crop');
const demoData = require('../demoData');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer config for local image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files (jpg, png, webp) are allowed'));
  }
});

// Multer error handling wrapper
const handleUpload = (req, res, next) => {
  upload.single('receipt_image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
      }
      return res.status(400).json({ error: err.message });
    }
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

// GET /api/reports - Fetch latest price reports with optional filtering
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.crop_id) filter.crop_id = req.query.crop_id;
    if (req.query.mandi_id) filter.mandi_id = req.query.mandi_id;

    const reports = await PriceReport.find(filter)
      .populate('crop_id', 'name baseline_price')
      .populate('mandi_id', 'name state district')
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(reports);
  } catch (err) {
    console.warn('DB unavailable, serving demo reports');
    let filtered = demoData.reports;
    if (req.query.crop_id) filtered = filtered.filter(r => String(r.crop_id._id) === req.query.crop_id);
    if (req.query.mandi_id) filtered = filtered.filter(r => String(r.mandi_id._id) === req.query.mandi_id);
    res.json(filtered);
  }
});

// POST /api/reports - Submit a new price report
router.post('/', handleUpload, async (req, res) => {
  try {
    const { mandi_id, crop_id, reported_price, quantity } = req.body;

    // Validate required fields
    if (!mandi_id || !crop_id || !reported_price || !quantity) {
      return res.status(400).json({ error: 'All fields are required: mandi_id, crop_id, reported_price, quantity' });
    }

    const price = Number(reported_price);
    const qty = Number(quantity);

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ error: 'Quantity must be a positive number' });
    }

    // Spam validation: reject if >50% variance from baseline
    const crop = await Crop.findById(crop_id);
    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    const variance = Math.abs(price - crop.baseline_price) / crop.baseline_price;
    if (variance > 0.5) {
      return res.status(400).json({
        error: 'Price flagged as suspicious',
        code: 'SPAM_DETECTED',
        baseline_price: crop.baseline_price
      });
    }

    // Build report
    const report = new PriceReport({
      mandi_id,
      crop_id,
      reported_price: price,
      quantity: qty,
      has_receipt: !!req.file,
      receipt_image_url: req.file ? `/uploads/${req.file.filename}` : ''
    });

    await report.save();

    // Return populated report
    const populated = await PriceReport.findById(report._id)
      .populate('crop_id', 'name baseline_price')
      .populate('mandi_id', 'name state district');

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

module.exports = router;
