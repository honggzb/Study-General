import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ViewCanvas from "@/components/ViewCanvas";

const alpino = localFont({
  src: "Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
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
          className={`${alpino.variable} antialiased overflow-x-hidden bg-yellow-300`}
        >
          <main>
            {children}
            <ViewCanvas />
          </main>
        </body>
      </html>
  );
}
