import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileActions from "@/components/MobileActions";
import Navigation from "@/components/Navigation";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akkuş Motosiklet ve Bisiklet Tamir Servisi | Samsun Atakum, Canik, İlkadım",
  description: "Samsun'da motor ve bisiklet tamiri. Atakum, Canik ve İlkadım bölgelerinde profesyonel motor rektefiye, periyodik bakım ve bisiklet tamir hizmetleri.",
  keywords: [
    "Samsun motor tamiri",
    "Atakum motor tamiri",
    "Canik bisiklet bakımı",
    "İlkadım motor rektefiye",
    "Samsun bisiklet tamiri",
    "motor elektrik arıza Samsun",
    "motor periyodik bakım Samsun",
    "bisiklet tamir Atakum"
  ],
  authors: [{ name: "Akkuş Motosiklet ve Bisiklet Tamir Servisi" }],
  openGraph: {
    title: "Akkuş Motor - Samsun'da Güvenilir Motor ve Bisiklet Tamiri",
    description: "Atakum, Canik ve İlkadım bölgelerinde 20 yıllık tecrübe ile motor ve bisiklet tamir hizmetleri",
    locale: "tr_TR",
    type: "website",
    siteName: "Akkuş Motosiklet ve Bisiklet Tamir Servisi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Kullanıcı ekleyecek
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} antialiased bg-asphalt-900 text-asphalt-50`}>
        <Navigation />
        {children}
        <MobileActions />
      </body>
    </html>
  );
}
