# Ideas Space Blog - A Blogging Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-blue?logo=next.js" alt="Next.js 14">
  <img src="https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-3.3-blue?logo=tailwind-css" alt="Tailwind CSS">
</div>

## 🌍 Demo

Explore the live demo of Ideas Space Blog to experience its features firsthand:

- **Live Demo**: [ideas-space-blog](https://ideas-space-blog.vercel.app)

## 📌 Core Features

- **Multifunctional blogging platform**
- **Comprehensive user authentication and management system**
  - Email-based or OAuth-provider authentication (e.g., GitHub, Google)
  - Password recovery
  - Profile management
- **Flexible content management system**
  - Create/edit posts
  - Manage categories
  - Upload and process images
- **Admin panel**
  - User management
  - Post moderation
  - Category management
- **Analytics and statistics**
  - Visit tracking
  - User activity analytics
- **Progressive Web App (PWA) Capabilities**
  - **Offline Support:** Access content even without an active internet connection.
  - **Installable:** Users can add the app to their home screen for a native-like experience.
  - **Improved Performance:** Faster loading times and seamless navigation using client-side caching.

## 🛠️ Project Features

### ➤ Integration with External Services

- **[Cloudinary](https://cloudinary.com/)** - for media storage and processing
  - Automatic image optimization
  - Format conversion
  - Thumbnail generation
- **[NEON](https://neon.tech/)** - as the primary database
  - High performance
  - Scalability
  - PostgreSQL support
- **[Resend](https://resend.com/)** - for email notifications
  - Handles email delivery for user actions such as registration confirmations and password recovery
  - Provides reliable and easy integration for sending transactional emails

### ➤ Technology Stack

- **[Next.js 14](https://nextjs.org/)** - for SSR and static generation
- **[TypeScript](https://www.typescriptlang.org/)** - for type safety and code reliability
- **[ESLint](https://eslint.org/)** - Statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline
- **[Prettier](https://prettier.io/)** - An opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary
- [**Vitest**](https://vitest.dev/) : For unit and integration testing
- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework that streamlines web development by providing a set of pre-designed utility classes
- **[Zustand](https://zustand-demo.pmnd.rs/)** - for state management
- **[Auth.js (aka next-auth.js)](https://authjs.dev/)** - for authentication
- **[React Hook Form](https://react-hook-form.com/)** - A library that helps you validate forms in React
- **[Shadcn](https://ui.shadcn.com/)** - A collection of beautifully designed, accessible, and customizable React components that you can use to build modern web applications with Next.js
- **[Zod](https://zod.dev/)** - Schema validation with static type inference
- **[Prisma](https://www.prisma.io/)** - Next-generation TypeScript ORM
- **[Tanstack Tables](https://tanstack.com/table/v8)** - Headless UI for building powerful tables and datagrids
- **[Nuqs](https://nuqs.47ng.com/)** - Search params state manager for Next.js applications

## 🔧 Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
DATABASE_URL="your_database_url"

CLOUDINARY_URL="your_cloudinary_url"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"

NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"

RESEND_API_KEY="your_resend_api_key"
```

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ideas-space-blog.git
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables (see above)

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Build for production:
   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   # or
   bun build
   ```

6. Start the production server:
   ```bash
   npm run start
   # or
   yarn start
   # or
   pnpm start
   # or
   bun start
   ```

7. Lint and format code:
   ```bash
   npm run lint
   npm run format
   # or
   yarn lint
   yarn format
   # or
   pnpm lint
   pnpm format
   # or
   bun lint
   bun format
   ```

## 📂 Project Structure

```plaintext
ideas-space-blog/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication routes (login, register, etc.)
│   ├── (main)/             # Main application routes
│   │   ├── (admin)/        # Admin panel routes (statistics, users, posts, categories)
│   │   ├── blog/           # Blog related pages (single-post, new-post, edit-post)
│   │   ├── privacy-policy/ # Privacy-policy page
│   │   └── impressum/      # Impressum page
│   ├── (protected)/        # Protected user routes (profile, settings)
│   ├── (themed)/           # Themed routes with specific layouts
│   │   ├── categories/     # Category pages (single-category)
│   │   └── ~offline/       # Offline page
│   ├── api/                # API routes
│   ├── error.tsx           # Global error boundary
│   ├── not-found.tsx       # Global 404-page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── manifest.ts         # PWA manifest
│   ├── page.ts             # Home page
│   └── sw.ts               # Service-workers
├── actions/                # Server actions
├── components/             # React components
│   ├── admin/              # Admin panel components
│   ├── auth/               # Authentication related components
│   ├── hoc/                # Higher-order components
│   ├── home/               # Home page components
│   ├── layout/             # Layout components
│   ├── posts/              # Post related components
│   ├── profile/            # User profile components
│   ├── shared/             # Shared/common components
│   ├── sidebars/           # Sidebar components
│   └── ui/                 # UI component library
├── hooks/                  # Custom React hooks
├── libs/                   # Core libraries and configurations
│   ├── auth/               # Authentication setup
│   ├── cloudinary/         # Cloudinary integration
│   ├── db.ts               # Database configuration
│   └── searchparams.ts     # Search params utilities
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
│   ├── icons/              # App icons and favicons
│   └── images/             # Static images
├── schemas/                # Validation schemas
├── services/               # Business logic services
│   ├── auth/               # Auth services
│   ├── categories/         # Category services
│   ├── images/             # Image handling services
│   ├── posts/              # Post services
│   └── userVisits/         # Analytics services
├── store/                  # Global state management
├── tests/                  # Test files and configurations
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
│   ├── constants/          # Application constants
│   └── helpers/            # Helper functions
└── views/                  # Page-level components
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
