import type { Metadata } from "next";
import { Outfit as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import ContainerProvider from "@/components/organism/ContainerProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: { template: "Faturrumahan | %s", default: "Faturrumahan" },
  description: "faturrumahan portofolio page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ContainerProvider>{children}</ContainerProvider>
      </body>
    </html>
  );
}
