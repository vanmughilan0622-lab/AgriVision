"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const backgrounds: Record<string, string> = {
    "/": "/bg/dashboard.png",
    "/disease-detection": "/bg/disease.png",
    "/crop-health": "/bg/health.png",
    "/crop-suggestion": "/bg/suggestion.png",
    "/environment": "/bg/env.png",
    "/mandi-rates": "/bg/mandi.png",
    "/advisor": "/bg/advisor.png",
    "/transportation": "/bg/transportation.png",
    "/community": "/bg/community.png",
    "/financials": "/bg/financials.png",
    "/crop-library": "/bg/library.png",
    "/settings": "/bg/settings.png",
};

export function BackgroundManager() {
    const pathname = usePathname();
    const bgImage = backgrounds[pathname] || "/bg/generic.png";

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-slate-950">
            <AnimatePresence mode="wait">
                <motion.div
                    key={bgImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.15, 1], 
                            x: [0, -30, 0], 
                            y: [0, -15, 0] 
                        }}
                        transition={{ 
                            duration: 45, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                </motion.div>
            </AnimatePresence>
            
            {/* Dark glassmorphism overlay to ensure UI text remains highly readable */}
            <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[4px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-slate-950/80" />
        </div>
    );
}
