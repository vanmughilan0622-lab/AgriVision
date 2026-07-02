import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import RootLayoutClient from "./layout-client";
import { LocationProvider } from "@/lib/location-context";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgriVision Resilience Platform",
  description: "Advanced agricultural management for modern farmers.",
};

export const maxDuration = 60; // Allow server actions up to 60 seconds

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={cn(inter.className, "bg-background text-foreground antialiased selection:bg-emerald-500/30 min-h-screen flex")}>
        <LanguageProvider>
          <LocationProvider>
            <RootLayoutClient>
              <Sidebar key="main-sidebar" />
              <main className="flex-1 relative min-h-screen overflow-x-hidden">
                {children}
              </main>

            </RootLayoutClient>
          </LocationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
