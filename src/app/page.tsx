import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/blog";

// Enable static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://invertdev.blog";

export default function Home() {
  const posts = getAllPosts();

  // JSON-LD structured data for home page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Invert Dev Blog",
    description:
      "Explore in-depth articles on web development, programming, Azure, .NET, React, Next.js, and modern software engineering practices.",
    url: siteUrl,
    author: {
      "@type": "Person",
      name: "Invert Dev",
    },
    publisher: {
      "@type": "Organization",
      name: "Invert Dev Blog",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.svg`,
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${siteUrl}/blog/${post.slug}`,
      author: {
        "@type": "Person",
        name: "Invert Dev",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <div className="relative mb-20 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative py-24 px-6">
          <div className="max-w-4xl">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full animate-fade-in-up">
              <span
                className="text-sm font-medium text-primary"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Latest Articles
              </span>
            </div>
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-in-up stagger-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              <span className="bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Stories & Insights
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl animate-fade-in-up stagger-2"
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
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative overflow-hidden rounded-2xl bg-card/50 border border-border/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 hover:bg-card">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500" />

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
                          className="text-sm font-medium text-primary"
                          style={{ fontFamily: "var(--font-outfit)" }}
                        >
                          {format(new Date(post.date), "MMMM dd, yyyy")}
                        </time>

                        {post.tags.length > 0 && (
                          <>
                            <span className="text-muted-foreground/50">•</span>
                            <div className="flex gap-2">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 bg-secondary/50 border border-border/50 rounded-full text-xs font-medium text-secondary-foreground"
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
                        className="text-4xl md:text-5xl font-bold mb-4 text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-primary group-hover:bg-clip-text transition-all duration-500"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {post.title}
                      </h2>

                      {/* Description */}
                      <p
                        className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          fontWeight: 300,
                        }}
                      >
                        {post.description}
                      </p>

                      {/* Read more */}
                      <div
                        className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300"
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
                  <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-24 animate-fade-in-up">
            <div className="inline-block p-6 rounded-2xl bg-card/50 border border-border/50">
              <p
                className="text-xl text-muted-foreground"
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
