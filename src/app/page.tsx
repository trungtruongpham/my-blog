import Link from "next/link"
import { getAllPosts } from "@/lib/blog"

export const revalidate = 3600

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://invertdev.blog"

export default function Home() {
  const posts = getAllPosts()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Invert Dev Blog",
    description:
      "Explore in-depth articles on web development, programming, Azure, .NET, React, Next.js, and modern software engineering practices.",
    url: siteUrl,
    author: { "@type": "Person", name: "Invert Dev" },
    publisher: {
      "@type": "Organization",
      name: "Invert Dev Blog",
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon.svg` },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${siteUrl}/blog/${post.slug}`,
      author: { "@type": "Person", name: "Invert Dev" },
    })),
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 items-end">
            {/* Left: Main copy */}
            <div>
              <p
                className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 animate-fade-in-up"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Writing on craft &amp; technology
              </p>

              <h1
                className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.92] tracking-tight mb-8 text-foreground animate-fade-in-up stagger-1"
                style={{
                  fontFamily: "var(--font-playfair)",
                  textWrap: "balance",
                }}
              >
                Stories &amp; Insights
              </h1>

              <p
                className="text-base text-muted-foreground max-w-lg leading-relaxed animate-fade-in-up stagger-2"
                style={{ fontFamily: "var(--font-outfit)", fontWeight: 300 }}
              >
                Exploring ideas, technology, and the art of building meaningful
                solutions. Honest takes on the craft of software.
              </p>
            </div>

            {/* Right: Article metadata (desktop only) */}
            <div className="hidden lg:flex flex-col items-end gap-5 pb-1 animate-fade-in-up stagger-3">
              <div className="text-right">
                <span
                  className="block text-7xl font-bold leading-none text-foreground/8 select-none tabular-nums"
                  aria-hidden="true"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {String(posts.length).padStart(2, "0")}
                </span>
                <p
                  className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Articles
                </p>
              </div>

              <div className="w-px h-12 bg-border" aria-hidden="true" />

              {posts[0] && (
                <div className="text-right" style={{ fontFamily: "var(--font-outfit)" }}>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                    Latest
                  </p>
                  <p className="text-sm text-foreground leading-snug max-w-[180px] text-right">
                    {posts[0].title}
                  </p>
                  <time
                    dateTime={posts[0].date}
                    className="text-xs text-muted-foreground mt-1 block"
                  >
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      year: "numeric",
                    }).format(new Date(posts[0].date))}
                  </time>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Index */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`group block cursor-pointer animate-fade-in-up stagger-${Math.min(
              index + 3,
              6
            )} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm`}
          >
            <article className="py-10 border-b border-border last:border-b-0">
              {/* Meta row */}
              <div
                className="flex items-center justify-between mb-5"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                <span
                  className="text-xs font-mono text-muted-foreground/40 select-none tabular-nums"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <time
                  dateTime={post.date}
                  className="text-xs text-muted-foreground tracking-wide"
                >
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }).format(new Date(post.date))}
                </time>
              </div>

              {/* Title */}
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-foreground group-hover:text-accent transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-playfair)",
                  textWrap: "balance",
                }}
              >
                {post.title}
              </h2>

              {/* Description */}
              <p
                className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-3xl"
                style={{ fontFamily: "var(--font-outfit)", fontWeight: 300 }}
              >
                {post.description}
              </p>

              {/* Footer row */}
              <div
                className="flex items-center justify-between"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs tracking-wide uppercase text-muted-foreground border border-border px-2 py-0.5 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read link */}
                <span className="flex items-center gap-1.5 text-xs tracking-wide uppercase text-muted-foreground group-hover:text-accent transition-colors duration-300 whitespace-nowrap">
                  Read article
                  <span
                    className="group-hover:translate-x-0.5 transition-transform duration-300 inline-block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
              </div>
            </article>
          </Link>
        ))}

        {posts.length === 0 && (
          <div
            className="text-center py-24 animate-fade-in-up"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <p className="text-sm text-muted-foreground">
              No articles published yet. Check back soon.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
