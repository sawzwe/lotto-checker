import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thai Lottery Checker - ตรวจสอบรางวัลสลากกินแบ่งรัฐบาล",
  description: "Check Thai Government Lottery Results Online - ตรวจสอบผลรางวัลสลากกินแบ่งรัฐบาลออนไลน์ ง่าย รวดเร็ว และแม่นยำ",
  keywords: "Thai lottery, สลากกินแบ่งรัฐบาล, ตรวจหวย, รางวัลหวย, lottery checker, หวยรัฐบาล",
  authors: [{ name: "Thai Lottery Checker" }],
  viewport: "width=device-width, initial-scale=1",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
