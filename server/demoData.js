// Hardcoded fallback data for demo mode when MongoDB is unavailable

const crops = [
  { _id: 'demo_crop_1', name: 'Onion', baseline_price: 1800 },
  { _id: 'demo_crop_2', name: 'Tomato', baseline_price: 2500 },
  { _id: 'demo_crop_3', name: 'Potato', baseline_price: 1200 }
];

const mandis = [
  { _id: 'demo_mandi_1', name: 'Azadpur Mandi', state: 'Delhi', district: 'New Delhi' },
  { _id: 'demo_mandi_2', name: 'Vashi APMC', state: 'Maharashtra', district: 'Navi Mumbai' },
  { _id: 'demo_mandi_3', name: 'Koyambedu Market', state: 'Tamil Nadu', district: 'Chennai' }
];

const now = Date.now();
const DAY = 86400000;
const HOUR = 3600000;

const reports = [
  { _id: 'demo_r1', crop_id: crops[0], mandi_id: mandis[0], reported_price: 1750, quantity: 30, has_receipt: true, receipt_image_url: '', timestamp: new Date(now - 1 * HOUR) },
  { _id: 'demo_r2', crop_id: crops[1], mandi_id: mandis[1], reported_price: 2650, quantity: 15, has_receipt: true, receipt_image_url: '', timestamp: new Date(now - 3 * HOUR) },
  { _id: 'demo_r3', crop_id: crops[2], mandi_id: mandis[2], reported_price: 1100, quantity: 45, has_receipt: false, receipt_image_url: '', timestamp: new Date(now - 5 * HOUR) },
  { _id: 'demo_r4', crop_id: crops[0], mandi_id: mandis[1], reported_price: 1900, quantity: 20, has_receipt: true, receipt_image_url: '', timestamp: new Date(now - 8 * HOUR) },
  { _id: 'demo_r5', crop_id: crops[1], mandi_id: mandis[2], reported_price: 2300, quantity: 10, has_receipt: false, receipt_image_url: '', timestamp: new Date(now - 12 * HOUR) },
  { _id: 'demo_r6', crop_id: crops[2], mandi_id: mandis[0], reported_price: 1350, quantity: 50, has_receipt: true, receipt_image_url: '', timestamp: new Date(now - 1 * DAY) },
  { _id: 'demo_r7', crop_id: crops[0], mandi_id: mandis[2], reported_price: 1650, quantity: 25, has_receipt: false, receipt_image_url: '', timestamp: new Date(now - 1.5 * DAY) },
  { _id: 'demo_r8', crop_id: crops[1], mandi_id: mandis[0], reported_price: 2700, quantity: 8, has_receipt: true, receipt_image_url: '', timestamp: new Date(now - 2 * DAY) },
  { _id: 'demo_r9', crop_id: crops[2], mandi_id: mandis[1], reported_price: 1250, quantity: 35, has_receipt: true, receipt_image_url: '', timestamp: new Date(now - 3 * DAY) },
  { _id: 'demo_r10', crop_id: crops[0], mandi_id: mandis[0], reported_price: 1820, quantity: 18, has_receipt: false, receipt_image_url: '', timestamp: new Date(now - 4 * DAY) },
];

module.exports = { crops, mandis, reports };
