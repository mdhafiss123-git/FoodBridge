# FoodBridge

FoodBridge connects surplus-food donors to nearby NGOs and delivery partners. This hackathon-ready prototype includes role-based JWT authentication, donation lifecycle management, a Leaflet map, impact analytics, and seeded demo accounts.

## Quick start

1. Install Node.js 20+ and start MongoDB (`docker compose up -d` is included).
2. Copy `.env.example` to `.env` and set secure values.
3. Run `npm install` in the project root, then `npm run seed` and `npm run dev`.
4. Open `http://localhost:5173`.

Demo password for all seeded accounts: `Demo@123`

| Role | Email |
|---|---|
| Donor | donor@foodbridge.demo |
| NGO | ngo@foodbridge.demo |
| Delivery | rider@foodbridge.demo |
| Admin | admin@foodbridge.demo |

## Deploy

Deploy MongoDB through MongoDB Atlas, use the included `render.yaml` for the API, and deploy the root repository to Vercel for the client. Configure `VITE_API_URL` on Vercel and `CLIENT_URL`, `MONGODB_URI`, and `JWT_SECRET` on Render.

## Architecture

- `client/`: Vite + React + TypeScript + Tailwind, Leaflet and Recharts.
- `server/`: Express + MongoDB/Mongoose JWT API.
- The matching score combines distance, capacity, and urgency. It is deliberately explainable for operational review.
