import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

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
    default: "Autoškola Royal Cars Liberec | Mgr. Josef Semirád",
    template: "%s | Royal Cars Liberec",
  },
  description:
    "Jiná liga autoškol v Liberci. Individuální přístup, výcvik v BMW X2 a vysoká úspěšnost u zkoušek. Začít můžete ihned.",
  keywords: [
    "autoškola Liberec",
    "řidičský průkaz Liberec",
    "Royal Cars",
    "autoškola BMW",
    "rychlokurz Liberec",
  ],
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
        alt: "Autoškola Royal Cars Liberec — výcvik v BMW X2",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh bg-bg font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
