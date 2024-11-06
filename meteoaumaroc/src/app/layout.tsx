import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Footer from "./FOOTER";
import "./globals.css";
import "../assets/styles/tailwind.css";
import "leaflet/dist/leaflet.css";
import Header_1 from "./components/Header-1";
import Script from "next/script";

import { GoogleAnalytics } from "@next/third-parties/google";

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
    <html lang="fr">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />

        {/* test adsns */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5069334614306556"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4073358363933800"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2525554321266874"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5201810489255350"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5201810489255350"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <Header_1 />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-FTCZ07PXXM" />
      {/* <Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-FTCZ07PXXM`}
  strategy="afterInteractive"
/>
<Script
  id="gtag"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FTCZ07PXXM');
    `,
  }}
/> */}
    </html>
  );
}
