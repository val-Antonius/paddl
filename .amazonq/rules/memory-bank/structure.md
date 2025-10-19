# Project Structure

## Directory Organization

### Root Level
- `src/` - Main application source code
- `public/` - Static assets and images
- `schema/` - Database schema files (db1.sql, db2.sql)
- Configuration files: `package.json`, `next.config.ts`, `tailwind.config.ts`

### Source Structure (`src/`)

#### Application Layer (`app/`)
- `(admin)/` - Admin-only routes with layout grouping
- `(user)/` - User-facing routes with layout grouping
- `api/` - API routes and webhook handlers
- `booking/` - Booking-related pages and flows
- `public/` - Public pages (landing, about, etc.)
- Core files: `layout.tsx`, `page.tsx`, `globals.css`

#### Components (`components/`)
- `auth/` - Authentication forms and components
- `booking/` - Booking-related UI components
- `public/` - Public-facing components
- `ui/` - Reusable UI components and primitives

#### Business Logic (`hooks/`)
Custom React hooks for:
- `useAuth.ts` - Authentication state management
- `useBooking.ts` - Booking operations
- `useCourts.ts` - Court data management
- `useBookedSlots.ts` - Slot availability tracking
- Animation hooks: `useParallax.ts`, `useScrollAnimation.ts`

#### Core Libraries (`lib/`)
- `auth/` - Authentication utilities and middleware
- `db/` - Database connection and queries
- `midtrans/` - Payment gateway integration
- `supabase/` - Supabase client configuration
- `utils/` - Shared utility functions
- `constants/` - Application constants

#### Type Definitions (`types/`)
- `database.ts` - Database schema types
- `common.types.ts` - Shared type definitions
- Domain-specific types: `benefits.types.ts`, `facilities.types.ts`, `pricing.types.ts`

## Architectural Patterns

### Route Organization
- **Route Groups**: Uses Next.js 13+ route groups `(admin)` and `(user)` for layout separation
- **API Routes**: RESTful API structure under `app/api/`
- **Nested Routing**: Hierarchical page structure following Next.js App Router conventions

### Component Architecture
- **Separation of Concerns**: Clear separation between UI components, business logic hooks, and data layers
- **Custom Hooks Pattern**: Business logic abstracted into reusable hooks
- **Type Safety**: Comprehensive TypeScript types for all data structures

### Data Flow
- **Supabase Integration**: Real-time database with PostgreSQL
- **Authentication**: JWT-based auth with bcrypt password hashing
- **Payment Processing**: Midtrans integration for Indonesian payment methods
- **State Management**: React hooks and context for local state management