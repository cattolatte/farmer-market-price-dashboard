# Changelog

All notable changes to MandiShare will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-13

### Added

#### Backend
- Express 5 server with MongoDB (Mongoose) integration
- `Crop` model with name and baseline price fields
- `Mandi` model with name, state, and district fields
- `PriceReport` model with crop/mandi references, price, quantity, receipt tracking, and timestamps
- `GET /api/crops` — fetch all crops sorted alphabetically
- `GET /api/mandis` — fetch all mandis sorted alphabetically
- `GET /api/reports` — fetch latest 50 reports with crop/mandi population and optional filtering
- `POST /api/reports` — submit price reports with multipart form data support
- Multer middleware for local receipt image uploads (JPG/PNG/WebP, 5MB limit)
- Spam validation: rejects prices with >50% variance from official baseline
- Database seed script with 3 crops, 3 mandis, and 10 historical reports
- Static file serving for uploaded receipt images

#### Frontend
- React 19 + Vite 8 with hot module replacement
- Tailwind CSS 4 with custom theme (emerald primary, amber accents)
- Glass morphism design system with frosted blur effects
- `Navbar` — sticky navigation with gradient logo, live indicator, report button
- `PriceFeed` — responsive 3-column card grid with shimmer skeleton loaders
- `PriceCard` — crop emoji, price with % deviation badge, location, time ago, trust badge
- `FilterBar` — crop and mandi dropdown filters with clear button
- `ComparisonChart` — Recharts bar chart comparing official baseline vs crowdsourced averages with gradient fills and custom tooltips
- `ReportForm` — modal with drag-and-drop receipt upload, image preview, inline baseline hints, loading spinner, and form validation
- Staggered entrance animations with spring easing curves
- Toast notifications for success, errors, and spam rejection
- Auto-refresh price feed on successful report submission
- Body scroll lock when modal is open
- Inter font via Google Fonts
- Mobile-responsive layout across all breakpoints

#### Infrastructure
- Concurrently setup to run both client and server with `npm run dev`
- Environment configuration via dotenv with `.env.example` template
- Global gitignore for development tooling
