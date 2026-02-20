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

const robert = localFont({
  src: [
    {path: '../public/fonts/robert-medium.woff2'},
    {path: '../public/fonts/robert-regular.woff2'},
  ],
  variable: '--font-robert',
  display: 'swap',
});

const circularWeb = localFont({
  src: '../public/fonts/circularweb-book.woff2',
  variable: '--font-circular-web',
  display: 'swap',
});

const general = localFont({
  src: '../public/fonts/general.woff2',
  variable: '--font-general',
  display: 'swap',
});

const zentry = localFont({
  src: '../public/fonts/zentry-regular.woff2',
  variable: '--font-zentry',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "GSAP Next.js Portfolio",
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
          className={`${robert.className} ${circularWeb.className} ${general.className} ${zentry.className} ${inter.variable} ${calistoga.variable} antialiased`}
        >
            {children}
        </body>
      </html>
  );
}
