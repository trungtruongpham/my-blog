import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/blog";

// Enable static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative mb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-950 dark:via-amber-950/20 dark:to-slate-950 opacity-60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/30 dark:bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative py-24 px-6">
          <div className="max-w-4xl">
            <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-full animate-fade-in-up">
              <span
                className="text-sm font-medium bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Latest Articles
              </span>
            </div>
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-in-up stagger-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              <span className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-amber-100 dark:to-slate-100 bg-clip-text text-transparent">
                Stories & Insights
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl animate-fade-in-up stagger-2"
              style={{ fontFamily: "var(--font-outfit)", fontWeight: 300 }}
            >
              Exploring ideas, technology, and the art of building meaningful
              solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid gap-8 md:gap-12">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group animate-fade-in-up stagger-${Math.min(
                index + 3,
                6
              )}`}
            >
              <article className="relative">
                {/* Decorative accent line */}
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-500/30">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 transition-all duration-500" />

                  <div className="relative p-8 md:p-12">
                    {/* Post number */}
                    <div
                      className="absolute top-8 right-8 text-8xl md:text-9xl font-bold opacity-5 dark:opacity-10 select-none"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="relative z-10">
                      {/* Meta information */}
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <time
                          dateTime={post.date}
                          className="text-sm font-medium text-amber-600 dark:text-amber-400"
                          style={{ fontFamily: "var(--font-outfit)" }}
                        >
                          {format(new Date(post.date), "MMMM dd, yyyy")}
                        </time>

                        {post.tags.length > 0 && (
                          <>
                            <span className="text-slate-400 dark:text-slate-600">
                              •
                            </span>
                            <div className="flex gap-2">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 bg-amber-100 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-full text-xs font-medium text-amber-700 dark:text-amber-300"
                                  style={{ fontFamily: "var(--font-outfit)" }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h2
                        className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 dark:group-hover:from-amber-400 dark:group-hover:to-orange-400 group-hover:bg-clip-text transition-all duration-500"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {post.title}
                      </h2>

                      {/* Description */}
                      <p
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-6"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          fontWeight: 300,
                        }}
                      >
                        {post.description}
                      </p>

                      {/* Read more */}
                      <div
                        className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium group-hover:gap-4 transition-all duration-300"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        <span>Read article</span>
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent border */}
                  <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-24 animate-fade-in-up">
            <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 border border-amber-200 dark:border-slate-700">
              <p
                className="text-xl text-slate-600 dark:text-slate-400"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                No articles published yet. Check back soon for new content!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
