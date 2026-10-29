# Zepto storefront

Responsive React storefront inspired by the supplied Zepto reference screens. It includes department browsing, product search, product quick view, a persistent local cart, location selection, login/register, and responsive storefront sections.

## Run locally

1. Start the Spring Boot backend on `http://localhost:8080`.
2. From this directory, run `npm install` once and then `npm run dev`.
3. Open the local URL printed by Vite.

The Vite development server proxies `/api` to the backend. To use a different API base, define `VITE_API_BASE_URL` (for example `https://api.example.com/api/v1`).

The frontend uses the backend authentication and catalog endpoints when available. It falls back to a bundled demo catalog when the backend has no data or is unavailable. Cart persistence is currently browser-local because the backend does not expose cart or order endpoints yet; checkout is therefore a UI placeholder.

## Commands

- `npm run dev` — start the local development server.
- `npm run build` — create the production bundle in `dist/`.
- `npm run lint` — run ESLint.
- `npm run preview` — serve the built bundle locally.
