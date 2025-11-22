import { notFound } from "next/navigation";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { incrementViewCount } from "@/lib/supabase";
import { Prose } from "@/components/prose";
import rehypePrettyCode from "rehype-pretty-code";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Enable static generation with ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

// Loading fallback for view counter
function ViewCounterSkeleton() {
  return (
    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      <span className="inline-block w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
    </span>
  );
}

async function ViewCounter({ slug }: { slug: string }) {
  // Increment view count (server-side) - non-blocking
  const viewCount = await incrementViewCount(slug);

  return (
    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      <span>
        {viewCount} {viewCount === 1 ? "view" : "views"}
      </span>
    </span>
  );
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    mdxOptions: {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "github-dark",
            keepBackground: true,
          },
        ],
      ],
    },
  };

  return (
    <div className="min-h-screen">
      {/* Back navigation */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span>Back to all articles</span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-6 pb-24">
        {/* Decorative header background */}
        <div className="relative mb-16 -mx-6 px-6 py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:via-amber-950/20 dark:to-slate-900 opacity-50" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/20 dark:bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300/20 dark:bg-orange-500/10 rounded-full blur-3xl" />

          {/* Decorative quote marks */}
          <div
            className="absolute top-8 left-8 text-9xl font-serif text-amber-200/30 dark:text-amber-900/30 select-none"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            "
          </div>

          <header className="relative space-y-6">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 opacity-0 animate-fade-in delay-100">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-amber-100 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-full text-xs font-medium text-amber-700 dark:text-amber-300"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900 dark:text-slate-100 opacity-0 animate-fade-in delay-200"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {post.title}
            </h1>

            {/* Description */}
            <p
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl opacity-0 animate-fade-in delay-300"
              style={{ fontFamily: "var(--font-outfit)", fontWeight: 300 }}
            >
              {post.description}
            </p>

            {/* Meta information */}
            <div
              className="flex flex-wrap items-center gap-6 text-sm opacity-0 animate-fade-in delay-400"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <time
                dateTime={post.date}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{format(new Date(post.date), "MMMM dd, yyyy")}</span>
              </time>

              <span className="text-slate-400 dark:text-slate-600">•</span>

              <Suspense fallback={<ViewCounterSkeleton />}>
                <ViewCounter slug={slug} />
              </Suspense>
            </div>
          </header>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 mb-16 opacity-0 animate-fade-in delay-500">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 dark:via-amber-700 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-amber-400 dark:bg-amber-600" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 dark:via-amber-700 to-transparent" />
        </div>

        {/* Article content */}
        <div className="opacity-0 animate-fade-in delay-500">
          <Prose>
            <MDXRemote source={post.content} options={options} />
          </Prose>
        </div>

        {/* End decorative element */}
        <div className="mt-20 pt-12 border-t border-amber-200 dark:border-amber-900">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400 dark:to-amber-600" />
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-600" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-600" />
            </div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400 dark:to-amber-600" />
          </div>
        </div>
      </article>
    </div>
  );
}
