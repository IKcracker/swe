import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.swe.co.za"),
  title: { default: "SWE | Siyanqoba Worldwide Express", template: "%s | SWE" },
  description: "Domestic and international courier, express delivery, road freight and logistics solutions from Siyanqoba Worldwide Express.",
  keywords: ["SWE","Siyanqoba Worldwide Express","courier South Africa","road freight","overnight express","international courier","logistics South Africa"],
  openGraph: {
    title: "SWE | Siyanqoba Worldwide Express",
    description: "Courier, express delivery and freight solutions across South Africa and beyond.",
    type: "website",
    locale: "en_ZA",
    url: "https://www.swe.co.za"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full">{children}</body></html>;
}
