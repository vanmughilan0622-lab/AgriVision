"use client";

import React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bot } from "lucide-react";

import { BackgroundManager } from "@/components/ui/BackgroundManager";
import { InteractiveEffects } from "@/components/ui/InteractiveEffects";
import { useLanguage } from "@/lib/language-context";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { t } = useLanguage();
    const childrenArray = React.Children.toArray(children);

    return (
        <div className="relative w-full flex min-h-[100dvh]">
            {/* Live Wallpapers */}
            <BackgroundManager />
            
            {/* Global Immersive Effects */}
            <InteractiveEffects />

            {/* Split layout: persistent sidebar + transitioning content */}
            {pathname === '/login' || pathname === '/register' || pathname === '/' ? (
                <div className="flex-1 relative w-full min-h-[100dvh]">
                    {/* Render everything EXCEPT the Sidebar (which is index 0) */}
                    {childrenArray.slice(1)}
                </div>
            ) : childrenArray.length >= 2 ? (
                <>
                    {/* The first child is the Sidebar (persistent) */}
                    {childrenArray[0]}
                    {/* The second child is the main container with the transition */}
                    <div className="flex-1 relative">
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
                                className="w-full relative min-h-[100dvh] pt-16 md:pt-0"
                            >
                                {childrenArray[1]}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </>
            ) : (
                <div className="w-full relative min-h-[100dvh]">
                    {children}
                </div>
            )}

            {/* Floating Valya AI Button */}
            {pathname !== '/' && pathname !== '/advisor' && pathname !== '/onboarding' && pathname !== '/login' && pathname !== '/register' && (
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
                            <span className="font-black tracking-tight text-sm md:text-base uppercase pr-2 hidden sm:inline">{t("nav.talkValya")}</span>
                        </motion.button>
                    </Link>
                </div>
            )}
        </div>
    );
}
