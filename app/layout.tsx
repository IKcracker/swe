import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "SWE | Specialised Worldwide Express", template: "%s | SWE" },
  description: "Domestic and international courier, express delivery, road freight and logistics solutions from Specialised Worldwide Express.",
  keywords: ["SWE","Specialised Worldwide Express","courier South Africa","road freight","overnight express","international courier","logistics South Africa"],
  openGraph: {
    title: "SWE | Specialised Worldwide Express",
    description: "Courier, express delivery and freight solutions across South Africa and beyond.",
    type: "website",
    locale: "en_ZA"
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full">{children}</body></html>;
}
