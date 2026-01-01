# TrueNorth Talent Advisory

TrueNorth Talent Advisory is a talent and recruiting platform that serves both companies and professionals. The public site highlights services, the blog publishes thought leadership, and the internal dashboard supports editorial workflows, subscribers, and contact inquiries.

## Features

- Marketing site with services, contact, and CTA sections
- Blog listing, detail pages, and subscribe flow
- Admin dashboard for blog management and contacts
- Passwordless admin login via Supabase OTP
- Media uploads for blog thumbnails via Cloudinary
- Email delivery for contact form via Nodemailer

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Supabase (Auth + Database)
- Nodemailer (SMTP)
- Cloudinary (image uploads)

## Requirements

- Node.js 18+
- pnpm 10+

## Getting Started

```bash
pnpm install
pnpm run dev
```

The app runs on `http://localhost:3000`.

## Environment Variables

Create a `.env` file with the following values:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_UPLOAD_PRESET=your-upload-preset

# Email (Nodemailer)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=admin@gmail.com
SMTP_PASS=app-password
CONTACT_RECEIVER_EMAIL=contact@yourdomain.com
```

## Scripts

```bash
pnpm run dev
pnpm run build
pnpm run start
pnpm run lint
```

## Project Structure

- `src/app/(external)` - public marketing pages and blog
- `src/app/dashboard` - admin dashboard
- `src/app/api` - API routes (contact, admin login, uploads)
- `src/components` - shared UI components
- `src/lib` - Supabase clients, helpers, and data

## Notes

- Global metadata lives in `src/app/layout.tsx`.
- Shared styling is in `src/app/globals.css`.
- Public assets are under `public/` (icons, manifest, images).
