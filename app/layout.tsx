import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Modrinth Embed",
  description:
    "A modern way to embed Modrinth projects on your website. Choose between server and client components, or use the compact badge format.",
  openGraph: {
    title: "Modrinth Embed - Modern Project Embeds",
    description:
      "Easily embed Modrinth projects on your website with modern React components.",
    images: ["/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modrinth Embed - Modern Project Embeds",
    description:
      "Easily embed Modrinth projects on your website with modern React components.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
  },
  metadataBase: new URL("https://modrinth-embed.vercel.app"),
  themeColor: "#10B981", // Emerald-500 color
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
