# SWE Red

SWE Red is a Next.js 16 logistics proposal site with a built-in shipment tracking backend and admin operations area.

## Core routes

- `/` — public marketing site
- `/track` — public shipment tracking
- `/api/tracking/[trackingNumber]` — public read-only tracking API
- `/admin/login` — protected admin login
- `/admin` — shipment operations dashboard
- `/admin/shipments/[id]` — shipment status and tracking history management

## Tracking backend

The tracking system uses Supabase PostgreSQL through the Supabase REST API.

The browser never receives the Supabase secret key. Database access and admin mutations happen only in Next.js server code.

### Data model

`shipments`
- tracking number
- customer reference
- origin / destination
- service type
- current status
- current location
- estimated delivery
- recipient details
- package count
- weight
- created / updated timestamps

`tracking_events`
- shipment
- status
- customer-facing event title
- description
- location
- event timestamp

## Backend setup

### 1. Create a Supabase project

Create a new Supabase project and open its SQL Editor.

### 2. Run the schema

Run the contents of:

```
supabase/schema.sql
```

The SQL creates the shipment tables, indexes, status constraints, timestamp trigger and row-level security.

No public table policies are created. The app accesses the database from server code using the secret key.

### 3. Add environment variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

Configure:

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SECRET_KEY=YOUR_SECRET_KEY
SWE_ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD
SWE_ADMIN_SESSION_SECRET=USE_A_LONG_RANDOM_SECRET
```

Never expose `SUPABASE_SECRET_KEY` to the browser and never prefix it with `NEXT_PUBLIC_`.

### 4. Run locally

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000/admin/login`
- `http://localhost:3000/track`

### 5. Configure Vercel

Add the same four environment variables in the Vercel project for Production and Preview.

Redeploy after saving the variables.

## Admin workflow

1. Sign in at `/admin/login`.
2. Create a shipment.
3. A tracking number is generated automatically if none is entered.
4. The system creates the initial tracking event.
5. Open a shipment and publish status updates.
6. Customers enter the tracking number at `/track`.
7. The public page displays only shipment-safe fields and tracking events.

## Statuses

- Booked
- Collected
- In transit
- At hub
- Out for delivery
- Delivered
- Exception
- Cancelled

## Security notes

- Admin sessions use an HTTP-only signed cookie.
- Shipment write operations require an authenticated admin session.
- The Supabase secret key remains server-side.
- Public tracking responses exclude recipient contact details.
- `/admin` and `/api` are excluded from search-engine crawling.
- For higher traffic, add distributed rate limiting to the public tracking endpoint and admin login.

## Build

```bash
npm run build
```
