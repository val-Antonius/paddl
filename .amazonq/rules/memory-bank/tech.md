# Technology Stack

## Core Technologies

### Frontend Framework
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library with latest features
- **TypeScript 5** - Type-safe JavaScript development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.23.24** - Animation library
- **Lucide React 0.545.0** - Icon library
- **clsx 2.1.1** - Conditional className utility
- **tailwind-merge 3.3.1** - Tailwind class merging

### Backend & Database
- **Supabase 2.75.0** - Backend-as-a-Service with PostgreSQL
- **bcryptjs 3.0.2** - Password hashing
- **jsonwebtoken 9.0.2** - JWT token management

### Payment Integration
- **Midtrans Client 1.4.3** - Indonesian payment gateway

## Development Tools

### Code Quality
- **ESLint 9** - Code linting with Next.js config
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing

### Build System
- **Next.js Build System** - Optimized production builds
- **Webpack** - Module bundling (via Next.js)
- **SWC** - Fast TypeScript/JavaScript compiler

## Development Commands

### Local Development
```bash
npm run dev    # Start development server on localhost:3000
npm run build  # Create production build
npm run start  # Start production server
npm run lint   # Run ESLint code analysis
```

### Environment Setup
- Node.js environment with npm package management
- Environment variables in `.env` file
- Vercel deployment configuration in `vercel.json`

## Database Schema
- PostgreSQL database via Supabase
- Schema files: `schema/db1.sql` and `schema/db2.sql`
- Type-safe database interactions with generated types

## API Architecture
- RESTful API routes under `app/api/`
- Webhook handlers for payment processing
- Server-side authentication middleware

## Deployment
- **Vercel Platform** - Optimized for Next.js deployment
- **Environment Variables** - Secure configuration management
- **Static Asset Optimization** - Automatic image and font optimization