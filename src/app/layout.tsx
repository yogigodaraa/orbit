import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrackFights — AI Relationship & Chat Analysis",
  description:
    "Upload a WhatsApp or Instagram chat export and get a brutally honest AI-powered relationship analysis. Ratings, fight patterns, love tracking, predictions, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Sidebar />
        <main className="md:pl-60 pb-16 md:pb-0 min-h-screen">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
