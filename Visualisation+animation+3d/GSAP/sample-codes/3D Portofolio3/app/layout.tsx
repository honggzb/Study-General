import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "GSAP Next.js an Awwwards-Level Website",
  description: "built with Next.js, Tailwind, and CSS animations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={`${inter.variable} ${calistoga.variable} antialiased`}
        >
          {children}
        </body>
      </html>
  );
}
