import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skill008 — Skills, issued.",
  description:
    "Record a task once. Get a skill that runs in any harness, on any model. We never touch your data or your keys.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mono.variable} dark`}>
      <body className="antialiased bg-[#0a0a0c] min-h-screen">{children}</body>
    </html>
  );
}
