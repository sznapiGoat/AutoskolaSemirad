import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import "./globals.css";
import { site } from "@/lib/site";
import { ConversionTracking } from "@/components/layout/ConversionTracking";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.webHref),
  title: {
    default: "Autoškola Liberec Royal Cars | Řidičák sk. B v BMW X2",
    template: "%s | Autoškola Royal Cars Liberec",
  },
  description:
    "Jiná liga autoškol v Liberci. Individuální přístup, výcvik v BMW X2 a vysoká úspěšnost u zkoušek. Řidičák sk. B od 17 999 Kč, splátky bez navýšení.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Autoškola Royal Cars Liberec",
    description:
      "Individuální přístup, výcvik v BMW X2 a vysoká úspěšnost u zkoušek.",
    locale: "cs_CZ",
    type: "website",
    siteName: "Autoškola Royal Cars Liberec",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Autoškola Royal Cars Liberec, výcvik v BMW X2",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autoškola Royal Cars Liberec",
    description:
      "Individuální přístup, výcvik v BMW X2 a vysoká úspěšnost u zkoušek.",
    images: ["/images/hero.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let isDraft = false;
  try {
    isDraft = (await draftMode()).isEnabled;
  } catch {
    isDraft = false;
  }

  return (
    <html lang="cs" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh bg-bg font-sans text-ink antialiased">
        {children}
        <Analytics />
        <ConversionTracking />
        {isDraft && <VisualEditing />}
      </body>
    </html>
  );
}
