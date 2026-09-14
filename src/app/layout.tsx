import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageTransition } from "@/components/PageTransition";
import { LeadCaptureWidget } from "@/components/leadcapture/LeadCaptureWidget";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KH Elevate — Empowering Your Growth",
  description:
    "KH Elevate is a growth marketing and content studio for ambitious brands — social media management, paid campaigns, creative content production, and strategy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-charcoal font-body">
        <SmoothScroll />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <LeadCaptureWidget />
      </body>
    </html>
  );
}
