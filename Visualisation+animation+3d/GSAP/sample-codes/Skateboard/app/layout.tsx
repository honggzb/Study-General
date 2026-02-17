import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bowlby_One_SC, DM_Mono } from "next/font/google";
import "./globals.css";

import { SVGFilters } from "@/components/SVGFilters";

const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bowlby-sc",
  weight: "400",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: "500",
});

const gambarino = localFont({
  src: "./gambarino.woff",
  display: "swap",
  variable: "--font-gambarino",
});

const geistMono = localFont({
  src: "./GeistMonoVF.woff",
  display: "swap",
  variable: "--font-geistMono",
});

export const metadata: Metadata = {
  title: "skateboards",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={`${geistMono.variable} ${gambarino.variable} ${bowlby.variable} ${dmMono.variable} antialiased font-medium text-zinc-800`}
        >
          <main>{children}</main>
          <SVGFilters />
        </body>
      </html>
  );
}
