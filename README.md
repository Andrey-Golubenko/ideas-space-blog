<div align="center"><strong>Next.js Ideas Space Blog</strong></div>
<div align="center">Built with the Next.js 14 App Router</div>
<br />
<div align="center">
<a href="https://">View Demo</a>
<span>
</div>

## Overview

Ideas Space Blog is a modern blog platform built using Next.js 14, leveraging both server and client components for optimal performance and flexibility. This repository showcases how to effectively use the following stack:

- Framework - [Next.js 14](https://nextjs.org)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- State Management - [Zustand](https://zustand-demo.pmnd.rs)
- Auth - [Auth.js](https://authjs.dev/)
- Forms - [React Hook Form](https://react-hook-form.com)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

## Pages

| Pages                                                                                 | Specifications                                                                                                                                                 |
| :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Home](https:// )                                                    | Main page of the blog.                                                                                                                                         |
| [Blog](https:// /blog)                                               | List of blog posts with pagination.                                                                                                                            |
| [Post](https:// /blog/:postSlug)                                     | Detailed view of a single blog post.                                                                                                                           |
| [New Post](https:// /blog/new-post)                                  | Form to create a new blog post.                                                                                                                                |
| [Edit Post](https:// /blog/:postId/edit-post)                        | Form to edit an existing blog post.                                                                                                                            |
| [Categories](https:// /categories)                                   | List of categories.                                                                                                                                            |
| [Category](https:// /categories/:categorySlug)                       | Posts filtered by category.                                                                                                                                    |
| [Profile](https:// /profile)                                         | User profile page.                                                                                                                                             |
| [Settings](https:// /settings)                                       | User settings page.                                                                                                                                            |
| [Admin Users](https:// /admin/admin-users)                           | Admin page to manage users.                                                                                                                                    |
| [Admin Posts](https:// /admin/admin-posts)                           | Admin page to manage posts.                                                                                                                                    |
| [Admin Categories](https:// /admin/admin-categories)                 | Admin page to manage categories.                                                                                                                               |
| [Login](https:// /auth)                                              | Login page.                                                                                                                                                    |
| [Register](https:// /auth/register)                                  | Registration page.                                                                                                                                             |
| [Email Verification](https:// /auth/email-verification)              | Email verification page.                                                                                                                                       |
| [Reset Password](https:// /auth/reset-password)                      | Password reset page.                                                                                                                                           |
| [New Password](https:// /auth/new-password)                          | Page to set a new password.                                                                                                                                                                                                                                |
| [Privacy Policy](https:// /privacy-policy)                           | Privacy policy page.                                                                                                                                           |
| [Impressum](https:// /impressum)                                     | Impressum page.                                                                                                                                                |

## Organization

```plaintext
app/ # Next.js App Router directory
│ ├── (auth)/ # Auth route group
│ │ ├── layout.tsx
│ │ └── page.tsx
│ └── api/ # API routes
│
├── components/ # Shared components
│ ├── admin/ # Admin components
│ │ ├── AdminPosts/
│ │ └── AdminUsers/
│ ├── shared/ # Shared components
│ │ └── DeleteHandlers/
│ ├── ui/ # UI components (buttons, inputs, etc.)
│ └── layout/ # Layout components (header, sidebar, etc.)
│
├── hooks/ # Custom hooks
│ └── usePostsFilters.ts
│
├── store/ # Zustand stores
│ └── index.ts
│
├── types/ # TypeScript types
│ └── index.ts
│
└── utils/ # Utility functions and constants
  ├── constants/
  │ ├── index.ts
  │ └── routes.ts
  └── helpers/
```

## Getting Started

> [!NOTE]  
> We are using **Next 14** with **React 18**, follow these steps:

Clone the repo:

```bash
git clone https://github.com/your-repo/ideas-space-blog.git
```

- `npm install`
- Add the required environment variables to the `.env` file.
- `npm run dev`

You should now be able to access the application at http://localhost:3000.

## Scripts

- `prepare`: Sets up Husky for pre-commit hooks.
- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for linting errors.
- `format`: Formats the code using Prettier.

## License

This project is licensed under the MIT license.

```