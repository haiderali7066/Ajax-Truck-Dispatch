# AJAX Dispatch — Next.js Website

Professional truck dispatch website built with Next.js 14, Tailwind CSS, Framer Motion, and React Hook Form.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Email**: Resend
- **Icons**: Lucide React
- **Language**: TypeScript

## Pages
- `/` — Home (Hero, Stats, Services, Equipment, How It Works, Testimonials, CTA)
- `/services` — Services (All 6 services in detail, Equipment types)
- `/about` — About (Story, Mission, Vision, Values, Who We Serve)
- `/contact` — Contact (Form, Contact details, Required documents)
- `/careers` — Careers (Open roles, Perks, Application form)

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` and add your Resend API key:
- Sign up at https://resend.com (free tier available)
- Create an API key and paste it as `RESEND_API_KEY`
- Verify your sending domain (ajaxdispatch.com) in Resend

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm start
```

## Deployment (Vercel — Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add `RESEND_API_KEY` in Vercel's Environment Variables settings
4. Deploy — Vercel handles everything automatically

## Customization

### Colors
Edit `tailwind.config.ts` to change the color palette.
Main amber accent color: `#F59E0B`
Background dark color: `#080810`

### Fonts
Fonts are loaded via Google Fonts in `app/globals.css`.
Current fonts: Bebas Neue (display), DM Sans (body)

### Contact Email
In `app/api/contact/route.ts`, update the `to` email address to your preferred inbox.

### Content
All page content is inline in each page file under `app/`. 
- `app/page.tsx` — Home
- `app/services/page.tsx` — Services
- `app/about/page.tsx` — About  
- `app/contact/page.tsx` — Contact
- `app/careers/page.tsx` — Careers

## Business Info
- **Phone**: +1 (855) 479-4089
- **Email**: info@ajaxdispatch.com
- **Website**: https://www.ajaxdispatch.com
- **Hours**: Monday–Saturday, 9AM–6PM EST
- **Location**: Wyoming, United States
