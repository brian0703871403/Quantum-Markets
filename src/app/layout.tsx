import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quantum Markets - Trade the Future of Finance",
  description: "The world's most advanced crypto trading platform. Trade 500+ cryptocurrencies with lightning-fast execution, military-grade security, and AI-powered analytics.",
  keywords: "crypto trading, bitcoin, ethereum, cryptocurrency exchange, quantum markets",
  openGraph: {
    title: "Quantum Markets - Trade the Future of Finance",
    description: "Advanced crypto trading platform with 500+ trading pairs, sub-millisecond execution, and AI-powered insights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" style={{ background: '#0a0a0f', color: '#f8fafc' }}>
        {children}
      </body>
    </html>
  );
}
