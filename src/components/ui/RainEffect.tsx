"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Raindrop {
    id: number;
    left: number;
    animationDuration: number;
    delay: number;
    opacity: number;
}

export function RainEffect() {
    const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        
        // Generate initial random raindrops
        const drops: Raindrop[] = Array.from({ length: 60 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // percentage
            animationDuration: Math.random() * 1 + 0.7, // 0.7s to 1.7s fall speed
            delay: Math.random() * 2, // stagger start times
            opacity: Math.random() * 0.3 + 0.1, // very subtle opacity 0.1 to 0.4
        }));
        
        setRaindrops(drops);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
            {raindrops.map((drop) => (
                <motion.div
                    key={drop.id}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ 
                        y: ["-5vh", "105vh"],
                        opacity: [0, drop.opacity, drop.opacity, 0]
                    }}
                    transition={{
                        duration: drop.animationDuration,
                        repeat: Infinity,
                        delay: drop.delay,
                        ease: "linear",
                    }}
                    className="absolute top-0 w-[2px] h-[15px] bg-gradient-to-b from-transparent to-blue-300/40 rounded-full"
                    style={{ left: `${drop.left}%` }}
                />
            ))}
        </div>
    );
}
