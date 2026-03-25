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

const Amiamie = localFont({
  src: [
    {path: '../public/fonts/amiamie/otf/Amiamie-Regular.otf'},
    {path: '../public/fonts/amiamie/otf/Amiamie-Italic.otf'},
    {path: '../public/fonts/amiamie/otf/Amiamie-Light.otf'},
    {path: '../public/fonts/amiamie/otf/Amiamie-LightItalic.otf'},
    {path: '../public/fonts/amiamie/otf/Amiamie-Black.otf'},
    {path: '../public/fonts/amiamie/otf/Amiamie-BlackItalic.otf'},
  ],
  variable: '--font-amiamie',
  display: 'swap',
});

const AmiamieRound = localFont({
  src: [
    {path: '../public/fonts/amiamie/otf/Amiamie-RegularRound.otf'},
    {path: '../public/fonts/amiamie/otf/Amiamie-BlackRound.otf'},
    {path: '../public/fonts/amiamie/otf/Amiamie-BlackItalicRound.otf'},
  ],
  variable: '--font-amiamie-round',
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
          className={`${Amiamie.className} ${AmiamieRound.className} ${inter.variable} ${calistoga.variable} antialiased`}
        >
          {children}
        </body>
      </html>
  );
}
