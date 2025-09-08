# E-commerce SPA

A single-page e-commerce web application with authentication, product listing, filtering, and persistent cart functionality.

---

## Features

### Backend

- **Built with:** Node.js, Express, PostgreSQL, Prisma ORM
- **Authentication:** Token-based signup, login, and protected routes
- **Product APIs:** Full CRUD for items (with price/category filters)
- **Cart APIs:** Add/remove items, cart persists per user in database

#### Database

- **PostgreSQL** is used for all data (users, products, cart, sessions)
- **Prisma** is used as the ORM (see `backend/prisma/schema.prisma`)

### Frontend

- **Built with:** React, Vite, TypeScript, Tailwind CSS
- **Authentication:** Signup and login pages
- **Product Listing:** Filter by price and category, search products
- **Cart:** Add/remove items, view cart, cart persists after logout
- **Professional UI:** Responsive, modern design

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

---

### Backend Setup

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**

   - create `.env` and set your Postgres connection string (`DATABASE_URL`)
   - Set `PORT=4000` (or your preferred port)

3. **Run database migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed products:**

   ```bash
   node prisma/seed.js
   ```

5. **Start the server:**

   ```bash
   npm run dev
   ```

   The backend runs on `http://localhost:4000` by default.

6. **API Endpoints:**
   - `POST /api/auth/signup` – Register new user
   - `POST /api/auth/login` – Login, returns token
   - `GET /api/products` – List products (supports `?category=&priceMin=&priceMax=&search=`)
   - `GET /api/cart?userId=...` – Get user cart (auth required)
   - `POST /api/cart` – Add item to cart (auth required)
   - `PUT /api/cart/:id` – Update cart item quantity (auth required)
   - `DELETE /api/cart/:id` – Remove item from cart (auth required)
   - `DELETE /api/cart` – Clear cart (auth required)

---

### Frontend Setup

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment:**

   - Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend API (e.g. `http://localhost:4000/api`)

3. **Start the frontend:**

   ```bash
   npm run dev
   ```

   The frontend runs on `http://localhost:8080` by default.

4. **Pages:**
   - `/signup` – Signup page
   - `/login` – Login page
   - `/products` – Product listing with filters
   - `/cart` – Cart page (add/remove items, persists after logout)

---

## Persistence

- Cart items are stored per user in the database and persist after logout (auth required).

---

## Professional UI

- Built with Tailwind CSS and custom components for a clean, modern look.
- Responsive design for desktop and mobile.

---

## Notes

- All features are implemented as per assignment requirements.
- Both backend and frontend are modular and easy to extend.
- For demo/testing, register a new account and use seeded products.
---
