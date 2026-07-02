"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const backgrounds: Record<string, string> = {
    "/dashboard": "/bg/dashboard.png",
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
    
    // Do not render wallpaper on the landing page, it has its own styling
    if (pathname === "/") return null;

    const bgImage = backgrounds[pathname] || "/bg/generic.png";

    return (
        <div className="fixed top-0 left-0 w-full h-[100lvh] -z-10 pointer-events-none overflow-hidden bg-slate-950">
            <AnimatePresence mode="wait">
                <motion.div
                    key={bgImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <div 
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
