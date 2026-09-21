# LOOKA Frontend

## Project
LOOKA is a full-stack web application focused on personal wardrobe management and outfit recommendations.

Core positioning:
"Style What You Own"

The main value proposition is helping users discover and maximize outfits from clothes they already own. LOOKA is not a marketplace and does not recommend products to purchase.

Target users:
- Students and young adults aged 18-25
- Users who want help organizing their wardrobe and deciding what to wear

## Frontend Stack
- React 19
- Vite 8
- JavaScript (not TypeScript)
- Tailwind CSS v4 (CSS-first config via `@import "tailwindcss"` in `src/index.css`; there is no `tailwind.config.js`)
- React Router DOM 7
- Axios
- Existing Node.js + Express backend API

Do not introduce TypeScript, TanStack Query, Redux, or other major libraries unless explicitly requested.

## Backend
The existing backend is developed separately and must not be modified from this frontend project.

Backend base URL:
http://localhost:5001/api

The frontend must consume the backend through its REST API.

Never put Gemini API keys, OpenWeather API keys, or other backend secrets in the frontend.

## MVP Features

1. Authentication & Profile
- Register
- Login
- JWT authentication
- Get current user
- Update profile
- Account management

2. Smart Digital Wardrobe
- Upload clothing images
- Clothing metadata
- Clothing catalog/grid
- Search
- Filter
- Add, edit, and delete clothing

3. Outfit Recommendation
- User selects occasion
- Recommendation considers wardrobe items, occasion, style, weather, and color compatibility
- Backend recommendation engine provides the outfit combinations
- Gemini is used by the backend as stylist advice
- Weather data is provided through the backend
- Lock/anchor an item
- Shuffle recommendations
- Save outfit/favorite

4. Wear Tracking
- Wear Today
- Outfit wear history
- Calendar view

5. Analytics
- Wardrobe utilization / analytics provided by the backend

There is NO admin dashboard in the MVP.

## Backend API
Use the existing backend API contract. Important endpoints include:

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/auth/profile`

Clothes:
- `GET /api/clothes/meta/filters`
- `GET /api/clothes`
- `POST /api/clothes`
- `GET /api/clothes/:id`
- `PUT /api/clothes/:id`
- `DELETE /api/clothes/:id`

Recommendations:
- `POST /api/recommendations`
- `GET /api/recommendations`

Outfits:
- `POST /api/outfits`
- `GET /api/outfits`
- `GET /api/outfits/:id`
- `PUT /api/outfits/:id`
- `DELETE /api/outfits/:id`
- `POST /api/outfits/wear-today`
- `GET /api/outfits/calendar`
- `DELETE /api/outfits/calendar/:id`

Analytics:
- `GET /api/users/analytics`

## Frontend Architecture
Keep the frontend modular and maintainable.

Expected structure should include, as appropriate:
- `pages/`
- `components/`
- `hooks/`
- `utils/`
- `api/`
- `assets/`

Use reusable components instead of duplicating UI.

Keep API communication separated from presentation components.

Use environment variables for frontend configuration:
- `VITE_API_BASE_URL`

The `.env` file must never be committed to Git.

## UI/UX Requirements
- Responsive on desktop, tablet, and mobile
- Clean and polished interface
- Handle loading states
- Handle error states
- Handle empty states
- Handle successful states
- API failures must not crash the application
- Avoid unnecessary over-engineering

## Development Rules
- Do not use dummy/static data as the final implementation when a backend API exists.
- Do not invent backend endpoints.
- If an API contract is unclear, ask before implementing.
- Do not modify backend code from this repository.
- Do not add major dependencies without explicit approval.
- Before making large architectural changes, explain the plan first.
- Prefer small, incremental changes.
- After meaningful changes, verify the application builds successfully (`npm run build`).
- Keep the existing working setup intact unless there is a clear reason to change it.

## Current State
Scaffold only. No LOOKA features implemented yet.

Existing files:
- `src/main.jsx` - `BrowserRouter` wrapper
- `src/App.jsx` - `Routes` with a single `/` placeholder route
- `src/pages/Home.jsx` - placeholder page
- `src/api/axios.js` - axios instance reading `VITE_API_BASE_URL`
- `.env` / `.env.example` - `VITE_API_BASE_URL`
