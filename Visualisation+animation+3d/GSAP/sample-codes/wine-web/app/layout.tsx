import type { Metadata } from "next";
import { Mona_Sans, DM_Serif_Text } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

const modernNegra = localFont({
  src: '../public/fonts/Modern Negra Demo.ttf',
  variable: '--font-modern-negra',
  display: 'swap',
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
          className={`${modernNegra.className} ${monaSans.variable} ${dmSerifText.variable} antialiased`}
        >
          {children}
        </body>
      </html>
  );
}
