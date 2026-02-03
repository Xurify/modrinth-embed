import type { Metadata, Viewport } from "next";
import { Geist_Mono, Jost, VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Modrinth Embeds",
  description:
    "A modern way to embed Modrinth projects on your website. Choose between server and client components, or use the compact badge format.",
  openGraph: {
    title: "Modrinth Embeds",
    description:
      "Easily embed Modrinth projects on your website with modern React components.",
    images: ["/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modrinth Embeds",
    description:
      "Easily embed Modrinth projects on your website with modern React components.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
  },
  metadataBase: new URL("https://modrinth-embed.vercel.app"),
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: "#10B981",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body
        className={`${jost.variable} ${geistMono.variable} ${vt323.variable} antialiased font-sans`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
