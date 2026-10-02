import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://swe-red.vercel.app"),
  title: { default: "SWE Red | Logistics Network", template: "%s | SWE Red" },
  description:
    "SWE Red is a modern logistics concept for domestic courier, road freight and international shipment services.",
  keywords: [
    "SWE Red",
    "logistics South Africa",
    "courier services",
    "road freight",
    "international logistics",
  ],
  icons: {
    icon: "/swe-red-icon.svg",
  },
  openGraph: {
    title: "SWE Red | Logistics Network",
    description:
      "A modern logistics concept for domestic, regional and international shipment services.",
    type: "website",
    locale: "en_ZA",
    url: "https://swe-red.vercel.app",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
