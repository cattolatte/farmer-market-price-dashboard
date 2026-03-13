const mongoose = require('mongoose');
require('dotenv').config();

const Crop = require('./models/Crop');
const Mandi = require('./models/Mandi');
const PriceReport = require('./models/PriceReport');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mandishare';

const crops = [
  { name: 'Onion', baseline_price: 1800 },
  { name: 'Tomato', baseline_price: 2500 },
  { name: 'Potato', baseline_price: 1200 }
];

const mandis = [
  { name: 'Azadpur Mandi', state: 'Delhi', district: 'New Delhi' },
  { name: 'Vashi APMC', state: 'Maharashtra', district: 'Navi Mumbai' },
  { name: 'Koyambedu Market', state: 'Tamil Nadu', district: 'Chennai' }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Crop.deleteMany({});
    await Mandi.deleteMany({});
    await PriceReport.deleteMany({});
    console.log('Cleared existing data');

    // Insert crops and mandis
    const insertedCrops = await Crop.insertMany(crops);
    const insertedMandis = await Mandi.insertMany(mandis);
    console.log('Inserted crops and mandis');

    // Generate 10 historical price reports over the last 7 days
    const reports = [];
    for (let i = 0; i < 10; i++) {
      const crop = insertedCrops[i % 3];
      const mandi = insertedMandis[i % 3];

      // Vary price within +/- 30% of baseline (within spam threshold)
      const variance = 1 + (Math.random() * 0.6 - 0.3);
      const price = Math.round(crop.baseline_price * variance);

      const daysAgo = Math.floor(Math.random() * 7);
      const hoursAgo = Math.floor(Math.random() * 24);

      reports.push({
        mandi_id: mandi._id,
        crop_id: crop._id,
        reported_price: price,
        quantity: Math.floor(Math.random() * 50) + 5,
        has_receipt: Math.random() > 0.4,
        receipt_image_url: '',
        timestamp: new Date(Date.now() - daysAgo * 86400000 - hoursAgo * 3600000)
      });
    }

    await PriceReport.insertMany(reports);
    console.log('Inserted 10 historical price reports');

    console.log('\nSeed complete!');
    console.log(`  Crops: ${insertedCrops.length}`);
    console.log(`  Mandis: ${insertedMandis.length}`);
    console.log(`  Reports: ${reports.length}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
