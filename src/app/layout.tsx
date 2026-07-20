import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StudyMate AI — Your AI Learning Companion",
  description:
    "Plan smarter, understand faster, and study with confidence using AI-driven study plans, document intelligence, and a conversational study assistant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}