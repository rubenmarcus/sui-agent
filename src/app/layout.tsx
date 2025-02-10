import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SuiProvider } from "./providers/SuiProvider";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Sui AI Image Generator & NFT Minter',
  openGraph: {
    title: 'Sui AI Image Generator & NFT Minter',
    description: 'AI Project',
    images: [
      {
        type: 'image/png',
        url: 'https://www.kriptofoni.com/wp-content/uploads/2024/11/sui-3.webp',
        width: '1200',
        height: '630',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sui AI Image Generator & NFT Minter',
    description: 'AI Project',
    creator: 'Ruben Marcus',
    images: 'https://www.kriptofoni.com/wp-content/uploads/2024/11/sui-3.webp',
  },
  description: 'AI Project',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SuiProvider> {children}</SuiProvider>
      </body>
    </html>
  );
}
