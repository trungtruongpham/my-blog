import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

// Site configuration - update these values for your site
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,

  // Canonical URL
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: ["/og-image.png"],
  },

  // Robots
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

  // Icons - Next.js App Router auto-generates from app/icon.svg and app/apple-icon.svg
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },

  // Manifest
  manifest: "/manifest.json",

  // Additional meta
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} ${outfit.variable} font-sans antialiased`}
      >
        <div className="min-h-screen bg-background">
          {/* Floating Header with Glassmorphism */}
          <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
            <div className="max-w-6xl mx-auto">
              <nav
                className="flex items-center justify-between px-6 py-4 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/10"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {/* Logo */}
                <Link
                  href="/"
                  className="group flex items-center gap-3 cursor-pointer"
                >
                  {/* Logo Icon */}
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow duration-300">
                    <svg
                      className="w-5 h-5 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  {/* Logo Text */}
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      Invert Dev
                    </span>
                    <span className="text-xs text-muted-foreground -mt-0.5">
                      Blog
                    </span>
                  </div>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-1">
                  <Link
                    href="/"
                    className="relative px-4 py-2 text-sm font-medium text-foreground rounded-lg hover:bg-secondary/50 transition-all duration-200 cursor-pointer group"
                  >
                    <span className="relative z-10">Home</span>
                    <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                  </Link>
                  <Link
                    href="/about"
                    className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/50 transition-all duration-200 cursor-pointer group"
                  >
                    <span className="relative z-10">About</span>
                    <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                  </Link>

                  {/* Divider */}
                  <div className="w-px h-6 bg-border/50 mx-2" />

                  {/* CTA Button */}
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
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
          <div className="h-24" />

          <main className="container mx-auto px-4 py-12 max-w-4xl">
            {children}
          </main>
          <footer className="border-t border-border mt-20">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              <p className="text-center text-muted-foreground text-sm">
                © {new Date().getFullYear()} Invert Dev Blog. Built with
                Next.js.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
