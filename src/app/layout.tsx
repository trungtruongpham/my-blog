import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
})

const siteConfig = {
  name: "Invert Dev Blog",
  description:
    "Explore in-depth articles on web development, programming, Azure, .NET, React, Next.js, and modern software engineering practices.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://invertdev.blog",
  author: "Invert Dev",
  twitterHandle: "@invertdev",
  locale: "en_US",
  keywords: [
    "web development",
    "programming",
    "software engineering",
    "Azure",
    ".NET",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "C#",
    "tutorials",
    "tech blog",
  ],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1917" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${dmSans.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        <div className="min-h-screen bg-background">
          {/* Editorial Masthead Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-5xl mx-auto px-6">
              <nav
                className="flex items-center justify-between h-14"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {/* Wordmark */}
                  <Link
                    href="/"
                    className="group flex items-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                  >
                  <div className="w-6 h-6 rounded-sm bg-foreground flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-300">
                    <svg
                      className="w-3.5 h-3.5 text-background"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-semibold tracking-[0.12em] uppercase text-foreground">
                      Invert Dev
                    </span>
                    <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground/60 font-normal">
                      Blog
                    </span>
                  </div>
                </Link>

                {/* Navigation Links */}
                <div
                  className="flex items-center gap-6"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <Link
                    href="/"
                    className="text-sm text-foreground hover:text-accent transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
                  >
                    About
                  </Link>
                  <span className="text-border select-none" aria-hidden="true">·</span>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                </div>
              </nav>
            </div>
          </header>

          {/* Spacer for fixed header */}
          <div className="h-14" />

          <main>{children}</main>

          <footer className="border-t border-border mt-24">
            <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p
                className="text-sm text-muted-foreground"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                © {new Date().getFullYear()} Invert Dev Blog
              </p>
              <p
                className="text-sm text-muted-foreground/50"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Built with Next.js
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
