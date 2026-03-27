# Ecoyaan Checkout Assignment

A simplified checkout flow inspired by Ecoyaan, built with Next.js App Router. The project demonstrates SSR data fetching for the cart, client-side state persistence across checkout steps, and a local mock API.

## Links

- Repository: `https://github.com/Rohit-rk07/ecoyaan-checkout`
- Deployment (public): `https://ecoyaan-checkout-4sawxjp9f-rohit12345rks-projects.vercel.app`

> If the deployment URL prompts for login or access, make it publicly accessible by using a **Production** deployment and disabling any **Deployment Protection** / password protection in the Vercel project settings. You can also deploy from the CLI with `npx vercel --prod`.

## Implemented Flow

- `/cart`
- `/checkout/shipping`
- `/checkout/payment`
- `/success`

## Technical Choices

- `Next.js App Router`: The cart page uses a Server Component to fetch cart data during rendering, which satisfies the SSR requirement without `getServerSideProps`.
- `Context API`: Cart data and shipping details need to persist across three client-side steps. Context kept this simple without adding an external state library.
- `Next.js API Route`: `GET /api/cart` serves the provided mock JSON locally so the SSR step still resembles a real backend fetch.
- `Tailwind CSS`: Used for fast iteration and responsive layout control without adding a larger UI dependency.

## Features

- SSR cart fetch using `fetch(..., { cache: "no-store" })`
- Cart list with product image, name, price, quantity, subtotal, shipping fee, and grand total
- Shipping form with required field validation
- Email format validation
- 10-digit phone number validation
- 6-digit PIN code validation
- Payment confirmation step that displays both the order summary and shipping address
- Simulated payment flow leading to a success page
- Multiple saved addresses (add / edit / delete) with local persistence across refresh
- Sticky bottom action bar with Back + Next Step buttons
- Responsive layout for mobile and desktop

## Mock Data

The app uses the exact JSON structure provided in the assignment through [lib/mockCartData.js](C:/Users/rohit/Desktop/Me/Projects/Assignmnt/ecoyaan-checkout/lib/mockCartData.js) and exposes it through [app/api/cart/route.js](C:/Users/rohit/Desktop/Me/Projects/Assignmnt/ecoyaan-checkout/app/api/cart/route.js).

```json
{
  "cartItems": [
    {
      "product_id": 101,
      "product_name": "Bamboo Toothbrush (Pack of 4)",
      "product_price": 299,
      "quantity": 2,
      "image": "https://via.placeholder.com/150"
    },
    {
      "product_id": 102,
      "product_name": "Reusable Cotton Produce Bags",
      "product_price": 450,
      "quantity": 1,
      "image": "https://via.placeholder.com/150"
    }
  ],
  "shipping_fee": 50,
  "discount_applied": 0
}
```

## Architecture

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
  CheckoutShell.jsx
  OrderSummary.jsx
  ShippingForm.jsx
context/
  CheckoutContext.jsx
lib/
  cartMath.js
  fetchCart.js
  mockCartData.js
```

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000/cart`.

## Notes

- The payment step is intentionally mocked because the assignment only asks for a simulated confirmation flow.
- The cart fetch is server-rendered only on the cart page; later steps use client state to keep the flow straightforward.
