import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const gambarino = localFont({
  src: "./gambarino.woff2",
  display: "swap",
  variable: "--font-gambarino",
});

export const metadata: Metadata = {
  title: "Côte Royale Paris",
  description: "Discover the exquisite collection of luxury fragrances by Côte Royale Paris",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${raleway.variable} ${gambarino.variable} antialiased bg-neutral-900 text-white`}
        >
          <Navbar />
          <main className="pt-14 md:pt-16">{children}</main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
