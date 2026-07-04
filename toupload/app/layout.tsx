import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://ajaxdispatch.com"),

  title: {
    default: "AJAX Dispatch Services",
    template: "%s | AJAX Dispatch",
  },

  description:
    "Professional truck dispatch services including compliance, IFTA, audits, driver onboarding, and more.",

  keywords: [
    "truck dispatch",
    "dispatch services USA",
    "IFTA filing",
    "MC DOT compliance",
    "freight dispatch",
  ],

  openGraph: {
    title: "AJAX Dispatch Services",
    description:
      "Reliable dispatch & compliance solutions for trucking businesses.",
    url: "https://ajaxdispatch.com",
    siteName: "AJAX Dispatch",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AJAX Dispatch",
    description: "Reliable trucking dispatch services",
    images: ["/og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
