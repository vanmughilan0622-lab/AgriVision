"use client";

import React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import { BackgroundManager } from "@/components/ui/BackgroundManager";
import { InteractiveEffects } from "@/components/ui/InteractiveEffects";
import { RainEffect } from "@/components/ui/RainEffect";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const childrenArray = React.Children.toArray(children);

    return (
        <div className="relative w-full flex min-h-screen">
            {/* Live Wallpapers */}
            <BackgroundManager />
            
            {/* Global Immersive Effects */}
            <InteractiveEffects />
            <RainEffect />

            {/* Split layout: persistent sidebar + transitioning content */}
            {childrenArray.length >= 2 ? (
                <>
                    {/* The first child is the Sidebar (persistent) */}
                    {childrenArray[0]}
                    {/* The second child is the main container with the transition */}
                    <div className="flex-1 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={pathname}
                                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                                className="w-full relative min-h-screen"
                            >
                                {childrenArray[1]}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </>
            ) : (
                <div className="w-full relative min-h-screen">
                    {children}
                </div>
            )}
        </div>
    );
}
