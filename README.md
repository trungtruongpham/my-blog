# my-blog

A high-performance blog built with Next.js 15, featuring beautiful typography, MDX support, and optimized rendering.

## Features

- ⚡ **Blazing Fast** - Static generation with ISR (Incremental Static Regeneration)
- 🎨 **Beautiful Design** - Editorial-inspired UI with Playfair Display and Outfit fonts
- 📝 **MDX Support** - Write blog posts in Markdown with syntax highlighting
- 📊 **View Counter** - Track post views with Supabase (optional)
- 🌙 **Dark Mode** - Elegant dark theme support
- 🚀 **Performance Optimized** - Sub-500ms page loads with caching

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load custom Google Fonts.

## Performance

This blog is highly optimized for speed:

- Static generation with 1-hour revalidation
- Non-blocking view counters with React Suspense
- Supabase integration with 2-second timeouts
- Next.js font optimization for fast loading

See [PERFORMANCE.md](./PERFORMANCE.md) for detailed information and Supabase setup instructions.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
