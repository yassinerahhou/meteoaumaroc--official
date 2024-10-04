import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Footer from "./FOOTER";
import "./globals.css";
import "../assets/styles/tailwind.css";
import "leaflet/dist/leaflet.css";
import Header_1 from "./components/Header-1";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Map Morocco",
  description: "Interactive weather map for Morocco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <Header_1 />
        {children}
        <Footer />
      </body>
    </html>
  );
}
