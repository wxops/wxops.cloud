# wxops.cloud — W'xOps IDP Landing Page

The official showcase website for **W'xOps Internal Developer Portal** — built on Platform Engineering principles with the Golden Path.

## Stack

- **Next.js 14** — App Router, TypeScript, static export (`output: 'export'`)
- **Tailwind CSS** — utility-first styling with custom theme
- **Framer Motion** — scroll-triggered animations & transitions
- **Lucide React** — icon system
- **Canvas API** — particle network hero background

## Sections

| Section | Description |
|---|---|
| Hero | Animated particle canvas, headline, stat counters |
| Golden Path | Platform Engineering flow visualization + core principles |
| Metrics | Evidence-backed before/after metrics with animated counters |
| Features | 6-card IDP capability grid (Identity, Onboarding, Catalog, …) |
| Architecture | Layered technical stack diagram + full tech pills |
| CTA | Call-to-action with benefits checklist |

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev            # → http://localhost:3000

# Build static export
npm run build          # → ./out/
```

## Docker

```bash
# Production — build image and serve with Nginx
docker compose --profile prod up --build

# Dev server inside Docker
docker compose --profile dev up
```

## GitHub Pages

Push to `main` and the [deploy workflow](.github/workflows/deploy.yml) builds the static export and publishes it automatically.

> If deploying to a sub-path (e.g. `username.github.io/wxops.cloud`), set
> `NEXT_PUBLIC_BASE_PATH=/wxops.cloud` in the workflow env.

