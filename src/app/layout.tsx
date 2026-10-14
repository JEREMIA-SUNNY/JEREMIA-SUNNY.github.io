import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { SkipLink } from "@/components/layout/SkipLink";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
import { links } from "@/data/links";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Full Stack Engineer Portfolio`,
    template: `%s · ${site.name}`,
  },
  description: `${site.name} is a full stack engineer portfolio showcasing React, Next.js, and NestJS projects, case studies, and professional experience.`,
  keywords: [
    "developer portfolio",
    "full-stack developer portfolio",
    "Next.js developer",
    "React developer",
    site.name,
  ],
  openGraph: {
    title: `${site.name} — Full Stack Engineer Portfolio`,
    description: site.heroIntro,
    url: siteUrl,
    siteName: `${site.name} — Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Full Stack Engineer Portfolio`,
    description: site.heroIntro,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: siteUrl,
  email: `mailto:${site.email}`,
  worksFor: {
    "@type": "Organization",
    name: site.currentCompany,
  },
  sameAs: [links.github, links.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Scroll-reveal targets ship hidden so they cannot flash before GSAP
            takes over. Without JavaScript that never happens, so put them back. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".motion-hidden{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <SmoothScroll>
            {/* MotionProvider must sit inside SmoothScroll — it reads the Lenis
                instance from context to keep ScrollTrigger in step with it. */}
            <MotionProvider>
              <SkipLink />
              <Navbar />
              <main id="main-content">{children}</main>
              <Footer />
              <CustomCursor />
            </MotionProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
