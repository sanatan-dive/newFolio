import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

// Premium heading font - geometric, modern feel
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Premium body font - clean, highly readable
const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sanatan Sharma | Designer & Developer",
  description: "Portfolio showcasing design and development projects by Sanatan Sharma - Full-Stack Development, AI integrations, and modern web technologies.",
  keywords: ["developer", "designer", "portfolio", "full-stack", "AI", "web development"],
  authors: [{ name: "Sanatan Sharma" }],
  openGraph: {
    title: "Sanatan Sharma | Designer & Developer",
    description: "Portfolio showcasing design and development projects",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
