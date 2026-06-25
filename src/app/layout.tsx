import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={cn(inter.className, "bg-background text-foreground antialiased selection:bg-emerald-500/30 min-h-screen flex overflow-x-hidden w-screen")}>
        <LanguageProvider>
          <LocationProvider>
            <RootLayoutClient>
              <Sidebar />
              <main className="flex-1 relative overflow-x-hidden overflow-y-auto">
                {children}
              </main>

              {/* Fixed Horizontal Footer Illustration */}
              <div className="fixed bottom-0 left-0 right-0 h-48 sm:h-64 pointer-events-none -z-10 opacity-70">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/footer.png" alt="Farming Illustration" className="w-full h-full object-cover object-[center_30%]" />
                {/* Gradient to blend smoothly into the content above */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              </div>
            </RootLayoutClient>
          </LocationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
