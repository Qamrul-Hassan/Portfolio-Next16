# QHS Portfolio

A modern personal portfolio website built with **Next.js 16**, **Tailwind CSS**, and other modern web technologies to showcase projects and skills.

## Features

- Responsive design (mobile/tablet/desktop)
- Smooth animations with **Framer Motion**
- Interactive project carousel using **Swiper.js**
- Typewriter effect with **React Simple Typewriter**
- Contact form integration with **EmailJS**
- Secure CV access (email OTP + protected viewer)
- Icons with **React Icons**
- Smooth scrolling with **React Scroll**

## Technologies Used

- **Next.js 16**
- **React**
- **Tailwind CSS**
- **Framer Motion**
- **Swiper.js**
- **React Simple Typewriter**
- **React Icons**
- **EmailJS** (contact form)
- **Redux Toolkit**
- **AOS** (Animate On Scroll)
- **Nodemailer (SMTP)** for CV OTP emails
- **Upstash Redis (REST)** for production OTP/rate-limit/audit storage

## Installation

```bash
git clone https://github.com/Qamrul-Hassan/Portfolio-Next16.git
cd Portfolio-Next16
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the project root.

### Secure CV (required)

- `CV_ACCESS_SECRET` (random long secret)
- `CV_AUDIT_KEY` (secret key for viewing audit logs)

### Secure CV OTP email (Gmail SMTP, required)

- `SMTP_HOST` (example: `smtp.gmail.com`)
- `SMTP_PORT` (example: `465`)
- `SMTP_SECURE` (`true` for port 465)
- `SMTP_USER` (your Gmail address)
- `SMTP_PASS` (Gmail App Password)
- `SMTP_FROM` (should match `SMTP_USER` for Gmail)

### Secure CV in production (Vercel, recommended)

Upstash Redis keeps OTP + rate limits + audit logs consistent across serverless instances:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## Secure Resume Flow

The resume is not served from `public/`. Users must:

1. Request access with an email
2. Enter the OTP received by email
3. Open the secure viewer link

Viewer route:

- `/cv/view?token=...`

## CV Audit Logs

To view recent audit logs (JSON):

```bash
GET /api/cv/audit?key=YOUR_CV_AUDIT_KEY&limit=50
```
