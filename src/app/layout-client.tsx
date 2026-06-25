"use client";

import React, { useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bot } from "lucide-react";
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

import { BackgroundManager } from "@/components/ui/BackgroundManager";
import { InteractiveEffects } from "@/components/ui/InteractiveEffects";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
        const initStatusBar = async () => {
            if (Capacitor.isNativePlatform()) {
                try {
                    // Make status bar transparent and overlay the webview
                    await StatusBar.setOverlaysWebView({ overlay: true });
                    await StatusBar.setBackgroundColor({ color: '#00000000' }); // Transparent
                    await StatusBar.setStyle({ style: Style.Dark }); // Light icons
                } catch (e) {
                    console.error('StatusBar setup failed:', e);
                }
            }
        };
        initStatusBar();
    }, []);

    return (
        <div className="relative w-full max-w-full flex min-h-[100dvh] overflow-x-hidden">
            {/* Live Wallpapers */}
            <BackgroundManager />
            
            {/* Global Immersive Effects */}
            <InteractiveEffects />

            {/* Split layout: persistent sidebar + transitioning content */}
            {childrenArray.length >= 2 ? (
                <>
                    {/* The first child is the Sidebar (persistent) */}
                    {childrenArray[0]}
                    {/* The second child is the main container with the transition */}
                    <div className="flex-1 relative min-w-0 overflow-x-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={pathname}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                                className="w-full relative min-h-[100dvh] pt-[calc(4rem+max(env(safe-area-inset-top),1.5rem))] md:pt-[max(env(safe-area-inset-top),1.5rem)] pb-[env(safe-area-inset-bottom)] overflow-x-hidden"
                            >
                                {childrenArray[1]}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </>
            ) : (
                <div className="w-full relative min-h-[100dvh] pt-[max(env(safe-area-inset-top),1.5rem)] pb-[env(safe-area-inset-bottom)]">
                    {children}
                </div>
            )}

            {/* Floating Valya AI Button */}
            {pathname !== '/advisor' && pathname !== '/onboarding' && (
                <div className="fixed bottom-6 right-6 z-[100] md:bottom-10 md:right-10">
                    <Link href="/advisor">
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-full px-5 py-4 md:px-6 shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.4)] transition-all border border-emerald-300/20"
                        >
                            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                                <Bot className="h-6 w-6 md:h-7 md:w-7 text-white" />
                            </div>
                            <span className="font-black tracking-tight text-sm md:text-base uppercase pr-2 hidden sm:inline">Talk with Valya AI</span>
                        </motion.button>
                    </Link>
                </div>
            )}
        </div>
    );
}
