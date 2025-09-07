# Cart Companion – E-commerce SPA

A single-page e-commerce web application with authentication, product listing, filtering, and persistent cart functionality.

---

## Features

### Backend

- **Built with:** Node.js, Express
- **Authentication:** JWT-based signup, login, and protected routes
- **Product APIs:** Full CRUD for items (with price/category filters)
- **Cart APIs:** Add/remove items, cart persists per user

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

2. **Start the server:**

   ```bash
   node index.js
   ```

   The backend runs on `http://localhost:5000` by default.

3. **API Endpoints:**
   - `POST /api/auth/signup` – Register new user
   - `POST /api/auth/login` – Login, returns JWT
   - `GET /api/products` – List products (supports `?category=&priceMin=&priceMax=&search=`)
   - `POST /api/products` – Add product (admin only)
   - `PUT /api/products/:id` – Update product (admin only)
   - `DELETE /api/products/:id` – Delete product (admin only)
   - `GET /api/cart` – Get user cart (auth required)
   - `POST /api/cart` – Add item to cart (auth required)
   - `DELETE /api/cart/:itemId` – Remove item from cart (auth required)

---

### Frontend Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the frontend:**

   ```bash
   npm run dev
   ```

   The frontend runs on `http://localhost:5173` by default.

3. **Pages:**
   - `/signup` – Signup page
   - `/login` – Login page
   - `/products` – Product listing with filters
   - `/cart` – Cart page (add/remove items, persists after logout)

---

## Persistence

- Cart items are stored per user and persist after logout (using localStorage and backend sync).

---

## Professional UI

- Built with Tailwind CSS and custom components for a clean, modern look.
- Responsive design for desktop and mobile.

---

## Submission

- **Working Website:** [Your deployed link here]
- **GitHub Repository:** [Your GitHub repo link here]

---

## Notes

- All features are implemented as per assignment requirements.
- Both backend and frontend are modular and easy to extend.
- For demo/testing, use the provided default admin/user credentials or register a new account.

---
