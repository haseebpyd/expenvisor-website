# Expenvisor Website

A modern, responsive website for the Expenvisor AI expense tracker app built with Next.js 14, TypeScript, and TailwindCSS.

## Features

- 🎨 **Midnight Aurora Theme** - Beautiful dark theme with gradient accents
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **Fast Performance** - Built with Next.js 14 and optimized for speed
- 🎭 **Smooth Animations** - Framer Motion animations throughout
- 🔍 **SEO Optimized** - Complete meta tags, sitemap, and robots.txt
- 📄 **Legal Pages** - Privacy Policy and Terms of Service
- 💬 **Contact Form** - Working contact form with validation
- 🎯 **Conversion Focused** - Designed to drive app downloads

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
website/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── privacy-policy/    # Privacy policy page
│   ├── terms-of-service/  # Terms of service page
│   ├── pricing/           # Pricing page
│   ├── contact/           # Contact page
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── Navbar.tsx        # Navigation bar
│   ├── Hero.tsx          # Hero section
│   ├── Features.tsx      # Features section
│   ├── Screenshots.tsx   # Screenshots carousel
│   ├── Pricing.tsx       # Pricing section
│   ├── FAQ.tsx           # FAQ section
│   └── Footer.tsx        # Footer
├── public/               # Static assets
│   ├── screenshots/      # App screenshots
│   ├── og-image.png     # Open Graph image
│   └── twitter-image.png # Twitter card image
├── tailwind.config.js    # TailwindCSS configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies
```

## Customization

### Colors
The Midnight Aurora theme colors are defined in `tailwind.config.js`:

- **Primary**: Midnight Blue (#191970)
- **Accent**: Electric Mint (#00FFA3)
- **Secondary**: Soft Purple (#A78BFA)

### Content
- Update app screenshots in `/public/screenshots/`
- Modify feature descriptions in `components/Features.tsx`
- Update pricing plans in `components/Pricing.tsx`
- Edit legal content in respective page files

### SEO
- Update metadata in `app/layout.tsx`
- Modify sitemap in `app/sitemap.ts`
- Update robots.txt in `app/robots.ts`

## Deployment

### Vercel (Recommended)

1. **Connect to Vercel**:
   - Push code to GitHub
   - Connect repository to Vercel
   - Deploy automatically

2. **Custom Domain**:
   - Add domain in Vercel dashboard
   - Update `baseUrl` in `sitemap.ts`

### Other Platforms

The website can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic with Next.js
- **Caching**: Optimized cache headers

## Legal Compliance

- **GDPR Compliant**: Privacy policy covers EU requirements
- **CCPA Compliant**: Privacy policy covers California requirements
- **App Store Ready**: Legal pages required for app store approval

## Support

For questions about the website:
- Email: support@expenvisor.com
- Documentation: [Next.js Docs](https://nextjs.org/docs)
- TailwindCSS: [TailwindCSS Docs](https://tailwindcss.com/docs)

## License

This website is part of the Expenvisor project. All rights reserved.