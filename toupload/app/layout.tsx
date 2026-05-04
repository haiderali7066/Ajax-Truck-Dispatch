import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AJAX Dispatch — Professional Truck Dispatch Services",
  description:
    "AJAX Dispatch helps owner-operators and trucking companies across the US maximize freight revenue with dedicated dispatch support, load searching, rate negotiation, and paperwork handling.",
  keywords:
    "truck dispatch, freight dispatch, owner operator, load board, rate negotiation, trucking services, dispatch service USA",
  openGraph: {
    title: "AJAX Dispatch — Professional Truck Dispatch Services",
    description:
      "Dedicated dispatch support for owner-operators and carriers. We find loads, negotiate rates, and handle paperwork so you can focus on driving.",
    url: "https://www.ajaxdispatch.com",
    siteName: "AJAX Dispatch",
    type: "website",
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
