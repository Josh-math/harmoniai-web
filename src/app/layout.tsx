import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harmivo",
  description:
    "Your intelligent companion for music analysis, performance and growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}