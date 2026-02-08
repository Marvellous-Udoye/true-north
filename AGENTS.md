# AGENTS.md - TrueNorth Talent Advisory

This document provides essential context for AI agents working on the TrueNorth Talent Advisory codebase.

## Project Overview

**TrueNorth Talent Advisory** is a talent advisory and recruitment platform with a marketing site, a public blog, and an internal admin dashboard. The site serves companies and professionals, while admins manage blogs, subscribers, and contact inquiries.

### Core Purpose

Deliver a polished marketing experience, publish thought leadership content, and provide an internal editorial dashboard for blog management.

## Technology Stack

### Core Technologies

- **Next.js 16.0.7** - App Router
- **React 19.2.0** - UI framework
- **TypeScript 5.x** - Type safety
- **TailwindCSS 4** - Styling
- **shadcn/ui (Radix primitives)** - Component library
- **Framer Motion** - Animations
- **Supabase** - Auth + database
- **reactjs-tiptap-editor + Tiptap** - Blog editor
- **Nodemailer** - Contact form email delivery
- **Cloudinary** - Blog image uploads
- **Sonner** - Toast notifications
- **pnpm** - Package manager

### Tooling

- **ESLint** - Linting
- **Next.js build pipeline** - Production builds

## Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── (external)/          # Landing, about, contact, blogs
│   ├── dashboard/           # Admin dashboard (blogs, contacts, subscribers)
│   └── api/                 # API routes (auth, contact, upload, subscribers)
├── components/              # Shared components
│   ├── ui/                  # shadcn/ui components
│   ├── dashboard/           # Dashboard shells/navigation
│   └── editor/              # Blog editor UI
├── lib/                     # Supabase clients, helpers, data
├── hooks/                   # Custom hooks
└── styles/                  # Global styles live in app/globals.css
public/                      # Static assets and manifest
```

## Key Features & Domains

### 1. Public Website

- **Location**: `src/app/(external)`
- **Pages**: Landing, About, Contact, Blogs
- **Notes**: Smooth scrolling, section anchors, responsive layout.

### 2. Blog System

- **Public**: `src/app/(external)/blogs`
- **Admin**: `src/app/dashboard/blogs`
- **Editor**: `src/components/editor`
- **Features**: Rich text editor, categories, publish/draft flow, image uploads.

### 3. Admin Dashboard

- **Location**: `src/app/dashboard`
- **Sections**: Overview, Blogs, Contacts, Subscribers, Profile
- **Auth**: Supabase OTP passwordless login + middleware route protection.

### 4. Contact + Subscribers

- **Contact API**: `src/app/api/contact`
- **Subscribers API**: `src/app/api/subscribers`
- **Dashboard Views**: `src/app/dashboard/contacts`, `src/app/dashboard/subscribers`

## State & Data

- Server data comes from Supabase.
- Client state is local React state and small hooks; no global state library used.

## Environment Variables

Required in `.env`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_UPLOAD_PRESET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_RECEIVER_EMAIL`

## Development Workflow

### Scripts

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm run lint
```

### Guidelines

- Do not revert UI tweaks or unrelated changes.
- Use existing shadcn/ui components when possible.
- Keep styles consistent with the established palette and layout.
- Ensure public blog rendering matches editor output styling.
- Avoid introducing new dependencies unless required.

## Key Files

- `src/app/layout.tsx` - Root layout + metadata
- `src/app/globals.css` - Global styles and editor theming
- `src/lib/supabase/*` - Supabase clients and helpers
- `middleware.ts` - Route protection
- `public/manifest.json` - PWA manifest