# Ecoyaan Checkout Assignment

A simplified checkout flow inspired by Ecoyaan, built with Next.js App Router.

## Live Flow

- `/cart` (SSR cart data)
- `/checkout/shipping` (shipping form + validation)
- `/checkout/payment` (payment confirmation)
- `/success` (order success)

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Context API
- Next.js API Routes (mock backend)

## Features

- Server-side cart data fetch with `cache: "no-store"`
- Multi-step checkout flow using router navigation
- Context-based global state for cart and shipping address
- Form validation for required fields, email, phone, and PIN
- Reusable UI components (`CartItem`, `OrderSummary`, `ShippingForm`)
- Responsive layout for mobile and desktop

## Project Structure

```text
app/
  api/cart/route.js
  cart/page.js
  checkout/shipping/page.js
  checkout/payment/page.js
  success/page.js
components/
  CartItem.jsx
  CartView.jsx
  OrderSummary.jsx
  ShippingForm.jsx
context/
  CheckoutContext.jsx
lib/
  fetchCart.js
  mockCartData.js
```

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000/cart`.

## Mock API

- Endpoint: `GET /api/cart`
- Response includes:
  - `cartItems`
  - `shipping_fee`
  - `discount_applied`
