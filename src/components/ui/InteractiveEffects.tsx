"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { Leaf } from "lucide-react";

export function InteractiveEffects() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    // Smooth spring physics for the trailing leaf
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const leafX = useSpring(0, springConfig);
    const leafY = useSpring(0, springConfig);

    useEffect(() => {
        setIsMounted(true);
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            leafX.set(e.clientX);
            leafY.set(e.clientY);
        };

        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, [leafX, leafY]);

    if (!isMounted) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            {/* Glowing Light Aura */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[100px] mix-blend-screen"
                animate={{
                    x: mousePosition.x - 300,
                    y: mousePosition.y - 300,
                }}
                transition={{ type: "tween", ease: "linear", duration: 0 }}
            />

            {/* Trailing Leaf */}
            <motion.div
                className="absolute text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] opacity-70"
                style={{
                    x: leafX,
                    y: leafY,
                    translateX: "-50%",
                    translateY: "100%", // Offset slightly below and right of the actual cursor
                }}
            >
                <Leaf className="w-5 h-5 -rotate-45" />
            </motion.div>
        </div>
    );
}
