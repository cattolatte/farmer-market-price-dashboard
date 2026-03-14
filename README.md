<div align="center">

# MandiShare

### Crowdsourced Farmer Price Transparency Dashboard

Break the information monopoly. Real prices, reported by real farmers.

[![Made with MERN](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

</div>

## The Problem

In India's agricultural markets (mandis), farmers often lack access to real-time, accurate price information. Middlemen exploit this information gap, offering below-market rates while the official APMC prices remain opaque or outdated. Farmers have no way to verify whether the price they received is fair.

## The Solution

**MandiShare** is a crowdsourced price transparency platform where farmers report their actual realized prices from APMC mandis. By aggregating real transaction data, MandiShare creates a trustworthy, community-driven price index that empowers farmers to negotiate better deals.

## Features

- **Live Price Feed** — Real-time stream of farmer-reported prices with filtering by crop and mandi
- **Trust Badges** — Submissions with uploaded receipt photos earn a "Verified" badge for authenticity
- **Price Comparison Chart** — Side-by-side visualization of official APMC baseline vs crowdsourced farmer averages
- **Spam Protection** — Backend validation rejects prices with >50% variance from official baselines
- **Receipt Upload** — Farmers can attach photos of their APMC receipt slips as proof of sale
- **Multilingual UI** — One-click English/Hindi toggle covering the entire interface
- **Demo Mode** — Graceful fallback to hardcoded data if MongoDB is unavailable — never crash during a live demo
- **Smart Image Compression** — Client-side canvas compression shrinks receipt photos to <500KB before upload
- **Responsive Design** — Glass morphism UI with smooth animations, optimized for mobile and desktop

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite, Tailwind CSS 4, Recharts |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB with Mongoose ODM |
| **File Upload** | Multer (local storage) |
| **i18n** | Lightweight React Context (English / Hindi) |
| **UI/UX** | Glass morphism, Inter font, staggered animations |

## Quick Start

### Prerequisites

- **Node.js** >= 18
- **MongoDB** running locally or a MongoDB Atlas URI

### Installation

```bash
# Clone the repository
git clone https://github.com/cattolatte/farmer-market-price-dashboard.git
cd farmer-market-price-dashboard

# Install all dependencies
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### Configuration

Create a `.env` file inside the `server/` directory:

```env
MONGO_URI=mongodb://localhost:27017/mandishare
PORT=5001
```

### Seed the Database

Populate with sample crops, mandis, and historical price reports:

```bash
npm run seed
```

### Run the App

```bash
npm run dev
```

This starts both the Express API (port 5001) and React dev server (port 5173) concurrently.

Open **http://localhost:5173** in your browser.

## Project Structure

```
farmer-market-price-dashboard/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── api/              # Axios API client
│   │   ├── components/       # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── PriceFeed.jsx
│   │   │   ├── PriceCard.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── ComparisonChart.jsx
│   │   │   └── ReportForm.jsx
│   │   ├── i18n/             # Internationalization
│   │   │   ├── translations.js
│   │   │   └── LanguageContext.jsx
│   │   ├── utils/            # Utilities
│   │   │   └── compressImage.js
│   │   ├── App.jsx           # Main application
│   │   └── index.css         # Tailwind + custom styles
│   └── index.html
├── server/                    # Express backend
│   ├── models/               # Mongoose schemas
│   │   ├── Crop.js
│   │   ├── Mandi.js
│   │   └── PriceReport.js
│   ├── routes/               # API route handlers
│   │   ├── crops.js
│   │   ├── mandis.js
│   │   └── reports.js
│   ├── seed.js               # Database seeder
│   ├── demoData.js           # Hardcoded fallback for demo mode
│   └── server.js             # Express app entry point
└── package.json              # Root with concurrently scripts
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/crops` | List all crops with baseline prices |
| `GET` | `/api/mandis` | List all mandis with locations |
| `GET` | `/api/reports` | Fetch price reports (supports `?crop_id=` and `?mandi_id=` filters) |
| `POST` | `/api/reports` | Submit a new price report (multipart form with optional receipt image) |

### POST /api/reports — Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `crop_id` | ObjectId | Yes | Selected crop |
| `mandi_id` | ObjectId | Yes | Selected mandi |
| `reported_price` | Number | Yes | Price per quintal (₹) |
| `quantity` | Number | Yes | Quintals sold |
| `receipt_image` | File | No | Receipt photo (JPG/PNG/WebP, max 5MB) |

### Spam Validation

Reports with a price deviating more than **50%** from the crop's official baseline are automatically rejected with a descriptive error message.

## Database Schema

**Crop** — `name`, `baseline_price`

**Mandi** — `name`, `state`, `district`

**PriceReport** — `crop_id`, `mandi_id`, `reported_price`, `quantity`, `receipt_image_url`, `has_receipt`, `timestamp`

## Seed Data

The seed script populates the database with:

| Crop | Baseline Price (₹/quintal) |
|------|---------------------------|
| Onion | 1,800 |
| Tomato | 2,500 |
| Potato | 1,200 |

| Mandi | Location |
|-------|----------|
| Azadpur Mandi | New Delhi, Delhi |
| Vashi APMC | Navi Mumbai, Maharashtra |
| Koyambedu Market | Chennai, Tamil Nadu |

Plus **10 historical price reports** with randomized data spanning the last 7 days.

## License

This project is licensed under the MIT License.

---

<div align="center">

**Built with purpose for Indian farmers.**

</div>
