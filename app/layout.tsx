import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Thai Lottery Checker - ตรวจสอบรางวัลสลากกินแบ่งรัฐบาล",
  description: "Check Thai Government Lottery Results Online - ตรวจสอบผลรางวัลสลากกินแบ่งรัฐบาลออนไลน์ ง่าย รวดเร็ว และแม่นยำ",
  keywords: "Thai lottery, สลากกินแบ่งรัฐบาล, ตรวจหวย, รางวัลหวย, lottery checker, หวยรัฐบาล",
  authors: [{ name: "Thai Lottery Checker" }],
  openGraph: {
    title: "Thai Lottery Checker - ตรวจสอบรางวัลหวย",
    description: "Check Thai Government Lottery Results Online - Fast, Easy, and Accurate",
    type: "website",
    locale: "th_TH",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
