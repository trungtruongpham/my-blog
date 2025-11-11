---
title: "Getting Started with Next.js 15"
description: "Learn the fundamentals of Next.js 15 and build modern web applications with React"
date: "2024-01-15"
tags: ["nextjs", "react", "typescript"]
---

# Getting Started with Next.js 15

Next.js 15 is the latest version of the popular React framework that enables you to build full-stack web applications. In this post, we'll explore the key features and improvements.

## What's New in Next.js 15

Next.js 15 introduces several exciting features:

- **Enhanced App Router**: Better performance and more intuitive routing
- **Improved Server Components**: Faster rendering and reduced bundle sizes
- **Turbopack**: Lightning-fast builds and hot reloading
- **Partial Prerendering**: Combine static and dynamic content seamlessly

## Setting Up Your First Project

To create a new Next.js 15 project, run:

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

This will scaffold a new project with all the necessary configuration files.

## Key Concepts

### Server Components

Server Components are the default in Next.js 15. They render on the server, reducing the amount of JavaScript sent to the client:

```tsx
export default function Page() {
  return (
    <div>
      <h1>Hello from Server Component</h1>
    </div>
  );
}
```

### File-Based Routing

Next.js uses a file-system based router. Create a file in the `app` directory, and it becomes a route:

- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/blog/[slug]/page.tsx` → `/blog/:slug`

## Conclusion

Next.js 15 continues to push the boundaries of web development. Whether you're building a simple blog or a complex web application, Next.js provides the tools you need to succeed.

Happy coding! 🚀
