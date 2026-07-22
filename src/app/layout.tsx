import type {
  Metadata,
} from "next";

import "./globals.css";

import {
  HarmivoProvider,
} from "./context/harmivo-context";

export const metadata: Metadata = {
  title: "Harmivo",
  description:
    "Your intelligent companion for music analysis, performance, and growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HarmivoProvider>
          {children}
        </HarmivoProvider>
      </body>
    </html>
  );
}