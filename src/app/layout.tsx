import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/config";
import "./globals.css";

// Body: Inter — neutral, highly readable. (Same setup as the main app.)
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Display / headings: Space Grotesk — technical, drafting-precise character.
const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Mono: IBM Plex Mono — the rare technical / drafting annotation.
const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Bender — join the $5 waitlist, lock in $12/yr",
    template: "%s | Bender",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: "Bender",
    title: "Bender — join the $5 waitlist, lock in $12/yr",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bender — join the $5 waitlist, lock in $12/yr",
    description: siteConfig.description,
    creator: "@yashjaiswal28_",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} antialiased`}
        >
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
