import BottomNavBar from "../components/bottomNavbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gecian Hub",
  description: "An app for GEC Palakkad students",
  manifest: "/manifest.webmanifest",
  themeColor: "#000000",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "bg-gray-800 text-white",
            style: {
              fontFamily: "var(--font-geist-sans)",
              fontSize: "14px",
            },
          }}></Toaster>
        <BottomNavBar />
      </body>
    </html>
  );
}

