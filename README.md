# Portfolio Platform

Production-ready portfolio and admin platform built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, and NextAuth.

## Overview

This project provides:
- Public portfolio pages for showcasing projects
- Protected admin panel for managing project content
- Secure credentials-based authentication
- Image upload pipeline compatible with local dev and Vercel Blob

## Core Capabilities

### Public Website
- Home page with professional profile sections
- Portfolio listing page
- Project detail page with gallery and structured project sections
- Responsive layout for desktop and mobile

### Admin System
- Admin login with credentials only
- Create, edit, and delete projects
- Cover image upload
- Gallery image upload
- Featured project toggle
- Route protection for admin pages and actions

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL (Nhost) or SQLite (local-compatible schema approach)
- NextAuth (Credentials Provider)
- bcrypt
- Vercel Blob (production file storage)

## Project Structure

```text
app/
  admin/
  api/auth/[...nextauth]/
  projects/[slug]/
  portfolio/
components/
lib/
prisma/
public/
```

## Environment Variables

Create `.env` from `.env.example` and set:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `BLOB_READ_WRITE_TOKEN` (required on Vercel for uploads)

## Local Development

```bash
npm install
npx prisma migrate dev
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Deployment (Vercel)

1. Push to GitHub
2. Import repository in Vercel
3. Set all required environment variables in Vercel Project Settings
4. Redeploy

Important:
- On Vercel, file writes to `/public/uploads` are read-only at runtime.
- Use `BLOB_READ_WRITE_TOKEN` so uploads are stored in Vercel Blob.

## Data Model

Main entities:
- `Project`: title, slug, shortDescription, content, coverImage, gallery, tools, featured, timestamps
- `Admin`: username, passwordHash

## Security Notes

- Credentials-based auth only (single admin flow)
- Passwords are validated with bcrypt hashes
- Admin routes and mutations are server-protected
- No public registration flow

## Maintainer

K.Abdelmonaim
