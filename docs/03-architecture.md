# Parky – Architecture (v1)

## Overview
Parky is a web app that displays a parking confidence overlay near a destination. It uses a backend to store reports and compute confidence per street segment.

## Components

### Frontend (Next.js)
Responsibilities:
- Map UI (view, pan, zoom)
- Destination search UI
- Display confidence overlay + top 3 recommendations
- Submit “I left a spot” reports
- Auth UI (sign in/out)

### Backend (Supabase recommended)
Responsibilities:
- Authentication and user profiles
- Store parking reports
- Compute confidence scores per street segment
- Serve confidence + recommendations via API
- Realtime updates to clients

### Database (Postgres)
Responsibilities:
- Persist reports, segments, confidence scores, user trust scores
- Enforce security via RLS

## High level data flow

1. User selects destination
2. Frontend requests street segments + confidence near destination
3. Backend returns segments + confidence + top recommendations
4. User submits “I left a spot” report
5. Backend validates (rate limit, proximity), stores report
6. Backend updates confidence and notifies clients (realtime)
7. Frontend updates overlay

## Diagram (v1)

[Browser / Next.js]
    |
    |  HTTPS (API requests)
    v
[Supabase Edge Functions / API]
    |
    |  SQL
    v
[Postgres Database]
    ^
    |  Realtime changes
    |
[Supabase Realtime] ---> [Browser / Next.js]

## Deployment (planned)
- Frontend deployed on Vercel
- Supabase hosted backend + database
