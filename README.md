# LOOKA

**Style What You Own**

LOOKA is a personal digital wardrobe and outfit recommendation web application. Users catalogue the clothes they already own, then get outfit suggestions built from that wardrobe — the goal is to make better use of an existing wardrobe rather than to recommend new products to buy. It is aimed at students and young adults, roughly 18–25.

This repository contains the **frontend** application. The backend is developed and deployed as a separate application.

---

## Features

### Authentication & Profile
- Register and login
- JWT-based authentication
- Protected application routes
- Profile information, including username and profile photo
- Style preferences
- Change password and account management

### Digital Wardrobe
- Add clothing items with image upload
- Clothing metadata: category, color, style, occasion, and weather
- Wardrobe grid with search and filtering
- Edit and delete clothing items

### Outfit Recommendation
- Select an occasion or context
- Receive outfit recommendations drawn from the user's own wardrobe
- Lock an item and generate an alternative combination
- Outfit preview with stylist advice
- Weather-aware recommendations, provided through the backend
- Save a recommended outfit, or mark it as worn today

### Lookbook
- Browse saved outfits
- Mark outfits as favorites
- View outfit detail
- Delete saved outfits

### Calendar
- Calendar view of outfit wear history
- Track which outfits were worn and when

### Dashboard
- Personalized greeting
- Weather and daily context
- Quick access to the main sections
- Recent looks and a wardrobe overview

---

## What LOOKA Is Not

- It is **not** a marketplace, and it does not recommend products to purchase.
- It is **not** a virtual try-on application.
- Gemini is used by the **backend** to assist with stylist advice. It is not the product itself, and it is not a frontend engine.
- Weather data is retrieved and handled by the backend recommendation system, not directly by the frontend.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite |
| Language | JavaScript |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM |
| HTTP client | Axios |
| Linting | Oxlint |

Tailwind CSS v4 is configured CSS-first through `src/index.css`; there is no `tailwind.config.js`.

---

## Project Structure

```
src/
├── api/          Axios instance and API service modules
├── assets/       Brand assets, mascot illustrations, placeholders
├── components/   Reusable UI, grouped by feature and shared primitives
├── config/       Environment-driven configuration
├── context/      React context providers (authentication, shared state)
├── hooks/        Custom hooks
├── pages/        Route-level views
└── utils/        Helper functions
```

API communication is kept separate from presentation components.

---

## Routes

**Public**

| Route | Description |
| --- | --- |
| `/login` | Sign in |
| `/register` | Create an account |

**Protected**

| Route | Description |
| --- | --- |
| `/dashboard` | Personalized overview |
| `/wardrobe` | Wardrobe grid, search, and filters |
| `/wardrobe/add` | Add a clothing item |
| `/wardrobe/:id/edit` | Edit a clothing item |
| `/recommendation` | Outfit recommendation |
| `/lookbook` | Saved outfits |
| `/calendar` | Wear history |
| `/profile` | Profile and account settings |

---

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- The LOOKA backend running locally, unless you use preview mode (see below)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=http://localhost:5001/api
VITE_FRONTEND_PREVIEW=false
```

`VITE_API_BASE_URL` already includes `/api`, so frontend requests are written as `/auth/login`, not `/api/auth/login`.

`VITE_FRONTEND_PREVIEW` controls how authentication and data are resolved:

- `true` — frontend preview mode. Authentication is simulated in the browser and the interface runs on local preview data, so the full UI is navigable without the backend running. Useful for working on the interface in isolation.
- `false` — real mode. The application uses JWT authentication against the backend defined by `VITE_API_BASE_URL`.

A reference file is available at `.env.example`. The `.env` file is gitignored and must not be committed. No API keys or secrets belong in this repository — Gemini, weather, and database credentials are all handled by the backend.

### Run the Development Server

```bash
npm run dev
```

The application runs at `http://localhost:5173`.

---

## Development

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run Oxlint |
| `npm run build` | Create a production build |
| `npm run preview` | Serve the production build locally |

---

## Architecture

LOOKA is split into two applications that are developed and deployed independently:

- **Frontend** (this repository) — React application that renders the interface and consumes the backend over REST.
- **Backend** (separate repository) — Node.js and Express API, backed by PostgreSQL with Drizzle ORM, using JWT and bcrypt for authentication and Docker for local orchestration. It also owns the recommendation engine, the weather integration, and the Gemini-assisted stylist advice.

The frontend does not contain backend code and must not modify it. During development the backend is expected at `http://localhost:5001/api`.

Backend integration is being carried out incrementally. The feature list above describes the intended product scope and the interface that exists in this repository; individual features are connected to live API endpoints progressively, and preview mode exists so the interface remains fully navigable while that work is in progress.

---

## Project Scope

This repository covers the MVP scope: authentication and profile, the digital wardrobe, outfit recommendation, the lookbook, wear tracking through the calendar, and the dashboard.

There is **no admin dashboard** in the current MVP.
