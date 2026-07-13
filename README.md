# LinkPulse

**LinkPulse** is a link management platform: shorten URLs, group them into campaigns, and track every click with geo, device, and referrer analytics. Frontend for the [LinkPulse API](https://github.com/AbdelrahmanMostafa0/linkpulse-api).

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Related Repositories](#related-repositories)
- [License](#license)

---

## Features

- **Link Shortening** -- Custom or suggested slugs, with slug-availability checking.
- **Campaigns** -- Group related links together and see aggregated performance across a campaign: total clicks, clicks over time, top countries/devices.
- **Click Analytics** -- Per-link and account-wide dashboards with a clicks-over-time chart, top countries, devices, browsers, and referrers.
- **Server-Side Redirects** -- Short links resolve with an instant server-side redirect for real visitors; social media crawlers still get the correct Open Graph preview.
- **Custom OG Previews** -- Set a custom title, description, and image per link, or reuse the destination page's own metadata.
- **UTM Builder** -- Optionally append `utm_source`, `utm_medium`, and `utm_campaign` to a link's destination at creation time.
- **QR Codes** -- Every link gets a downloadable QR code (PNG).
- **Tags** -- Free-form tags for organizing links outside of campaigns.
- **Auth** -- Email/password or Google OAuth, with profile management and account deletion.

---

## Tech Stack

| Category         | Technology                          |
| ----------------- | ------------------------------------ |
| Framework          | Next.js 16 (App Router)              |
| Language            | TypeScript                           |
| Styling              | Tailwind CSS 4                        |
| UI Primitives         | Radix UI (via `shadcn`), `lucide-react` |
| Forms & Validation      | React Hook Form, Zod                    |
| Animation                | Framer Motion                            |
| Charts                    | Recharts                                  |
| State                       | Redux Toolkit, React Context               |
| HTTP                          | Axios                                       |
| QR Codes                        | qrcode.react                                 |
| Auth                               | `@react-oauth/google`                          |

---

## Project Structure

```
app/
  page.tsx                    # Landing page
  create/                     # Create-link flow
  dashboard/                  # Account-wide analytics overview
  campaigns/                  # Campaign list + detail
  profile/
    my-links/                 # Link list + per-link analytics
  l/[slug]/                    # Server-rendered redirect (see below)
  login/, signup/, about/, terms/, privacy/

components/
  home-page/                  # Landing page sections
  auth/                        # Login/register/auth-gating
  links/
    create-link/                # Link creation form, OG inputs, success view
    my-links/                    # Links table + per-link analytics page
  campaigns/                     # Campaign list, detail, create/edit/delete dialogs
  dashboard/                      # Dashboard overview page
  analytics/                       # Shared chart/stat-card components
  profile/, navigations/, ui/        # Profile, nav, and shadcn primitives

services/                       # Axios API clients (links, campaigns, auth, profile)
types/                          # Shared TypeScript types
lib/                            # OG metadata helpers
data/                           # Static slug suggestions
```

### How `/l/[slug]` works

Rather than a client-side redirect (extra round trip, visible flash), `/l/[slug]` is a server component:

- **Real visitors** get an immediate server-side `redirect()` to the destination, with the click recorded server-side (forwarding the original User-Agent, Referer, and IP to the API).
- **Known crawler user agents** (Facebook, Twitter, Slack, Discord, etc.) render the page instead of redirecting, so they see the link's Open Graph metadata via `generateMetadata` rather than following the redirect to the destination's own tags.

---

## Getting Started

### Prerequisites

- Node.js 20+
- A running instance of the [LinkPulse API](https://github.com/AbdelrahmanMostafa0/linkpulse-api)

### Installation

```bash
git clone https://github.com/AbdelrahmanMostafa0/linkpulse.git
cd linkpulse

npm install

cp .env.example .env
# Edit .env with your API URL and Google client ID

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Script          | Description                    |
| ----------------- | -------------------------------- |
| `npm run dev`       | Start the dev server (Turbopack)  |
| `npm run build`       | Production build                    |
| `npm start`             | Start the production server           |
| `npm run lint`            | Run ESLint                              |

---

## Environment Variables

```env
# Base URL of the LinkPulse API
NEXT_PUBLIC_API_URL=http://localhost:9000/api

# Google OAuth client ID
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-google-client-id>
```

---

## Related Repositories

- **API** -- [linkpulse-api](https://github.com/AbdelrahmanMostafa0/linkpulse-api)

---

## License

ISC
