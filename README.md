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
├── app/                  # Next.js App Router
│   ├── (auth)/           # Authentication route group
│   ├── (main)/           # Main routes
│   ├── (protected)/      # Protected routes
│   ├── (themed)/         # Routes with different styles
│   ├── api/              # API endpoints
│   ├── error.tsx         # Common error page
│   ├── global.css        # Base and app-wide CSS rules
│   ├── layout.tsx        # App layout
│   ├── not-found.tsx     # 404 page
│   └── page.tsx          # Home page
├── components/           # Components
│   ├── admin/            # Admin components
│   ├── auth/             # Authentication components
│   ├── categories/       # Category components
│   ├── hoc/              # Higher-Order components
│   ├── home/             # Home-page components
│   ├── layout/           # Layout components
│   ├── navigation/       # Navigation components
│   ├── notification/     # Notification components
│   ├── posts/            # Posts components
│   ├── profile/          # Profile components
│   ├── shared/           # Shared components
│   └── ui/               # UI elements
├── hooks/                # Custom hooks
├── libs/                 # Utility libraries
│   ├── auth/             # Authentication logic
│   └── cloudinary/       # Cloudinary integration
├── prisma/               # Prisma ORM
│   └── schema.prisma     # Database schema
├── services/             # Business logic
│   ├── account/          # Account management
│   ├── categories/       # Categories
│   ├── posts/            # Posts
│   └── userVisits/       # Visit analytics
├── store/                # Zustand stores
├── types/                # TypeScript types
├── utils/                # Utilities
└── views/                # Page-level or screen components
```



## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
