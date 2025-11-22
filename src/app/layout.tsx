import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Invert Dev Blog",
  description: "A blog about web development, programming, and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} ${outfit.variable} font-sans antialiased`}
      >
        <div className="min-h-screen bg-background">
          <header className="border-b border-border">
            <div className="container mx-auto px-4 py-6 max-w-4xl">
              <nav className="flex items-center justify-between">
                <Link
                  href="/"
                  className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                >
                  Invert Dev Blog
                </Link>
                <div className="flex gap-6">
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </Link>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </div>
              </nav>
            </div>
          </header>
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
