# Changelog

All notable changes to MandiShare will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-03-14

### Added

#### Dark Mode
- Full dark theme with CSS custom properties for seamless light/dark switching
- Animated sun/moon toggle button with smooth knob transition
- Theme preference persisted in localStorage
- Respects system `prefers-color-scheme` on first visit
- All components fully themed: cards, chart, modals, filters, forms, dropdowns

#### Expanded Coverage
- 5 new APMC mandis: Gaddiannaram (Hyderabad), Kurnool Market Yard, Yeshwanthpur (Bengaluru), Lasalgaon (Nashik), Devi Ahilya Bai (Indore)
- 2 new crops: Rice (₹3,200/qtl) and Wheat (₹2,800/qtl)
- 25 historical seed reports (up from 10)
- Demo fallback data updated to match expanded dataset

#### UI Enhancements
- Floating ambient orbs with parallax animation for depth
- Card shine effect on hover (sweeping light gradient)
- Verified badge shimmer animation
- Number pop animation for stat card values
- Improved hover-lift with theme-aware shadow colors
- Dark-aware glow borders with vivid gradient in dark mode
- Themed toast notifications matching current color scheme
- Footer section with localized tagline

---

## [1.1.0] - 2026-03-14

### Added

#### Multilingual Support
- English/Hindi language toggle in the Navbar with seamless switching
- React Context-based i18n system (`LanguageContext`) with `useLanguage` hook
- Complete Hindi translations for all UI strings across every component
- Language toggle displays "हिंदी" in English mode and "English" in Hindi mode

#### Demo Mode Fallback
- Hardcoded fallback dataset (`demoData.js`) with 3 crops, 3 mandis, and 10 sample reports
- All API routes (crops, mandis, reports) gracefully serve demo data when MongoDB is unavailable
- Ensures the app never crashes during a live demo or if the database goes down

#### Frontend Image Compression
- Canvas-based image compression utility (`compressImage.js`)
- Automatically scales images larger than 1600px and compresses to <500KB
- Progressive quality reduction from 0.8 → 0.3 JPEG quality until target size is met
- Integrated into the ReportForm drag-and-drop upload flow

---

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
