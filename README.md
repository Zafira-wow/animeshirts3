# Zero Rules

Streetwear storefront demo built with React, TypeScript, Vite, and React Router.

## Run locally

Requirements: Node.js 20+ and npm.

```sh
npm install
npm run dev
```

Vite prints the local URL after the server starts. To create and preview a production build:

```sh
npm run build
npm run preview
```

`npm run lint` runs the application TypeScript diagnostics without emitting files.

## Included storefront flows

- 20 mock products across gym/sport, street/anime, oversized, cotton, and French terry collections.
- Responsive home, category, product detail, search, new-arrivals, wishlist, and cart pages.
- Composable category, gender, size, color, fit, material, price, and availability filters with sorting.
- Variant-aware cart, quantity controls, local coupon `ZERO10`, persisted cart/wishlist/gender preference.
- Custom tee local preview with two models and validated PNG/JPG/WebP image input (5 MB maximum).
- Guest checkout with a local Cash on Delivery demo order reference. No payment or fulfilment service is called.
- Local-only demo support and upcoming-collection interest forms; account sign-in is intentionally not simulated.
- Support, shipping, returns, size guide, privacy, terms, FAQ, and demo order lookup destinations.

## Demo boundaries

Product descriptions, inventory, prices, coupon, shipping estimate, return window, and country options are sample settings in `src/data.ts`. Review them for the actual market and business before launch. The USD 6.95 shipping estimate and seven-day return copy are not guarantees or legal advice.

Cart, wishlist, gender preference, demo support submissions, and upcoming interest are stored in browser local storage. Demo order references use session storage and are not sent to a warehouse, payment provider, or carrier. No card data is collected. Authentication, real order history, payment processing, tax, inventory, shipping, email notifications, and customer support require backend or third-party integrations.

Product photography is loaded from Unsplash. DM Sans and Barlow Condensed are loaded from Google Fonts, and Dashley wordmarks are loaded from Font Library; these assets require an internet connection. Replace illustrative photos with accurate product photography before production.
