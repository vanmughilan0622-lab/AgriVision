"use client";

import { useState, useEffect } from "react";
import { Search, AlertCircle, TrendingUp, Coins, Clock, Sprout, ChevronRight, ArrowRight, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCropSuggestions, CropSuggestion as CropSuggestionType } from "@/app/actions/crop-suggestion-hf";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function CropSuggestionPage() {
    const { t } = useLanguage();
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<CropSuggestionType[]>([]);

    useEffect(() => {
        const key = localStorage.getItem("huggingface_api_key");
        setApiKey(key);
    }, []);

    const handleGetSuggestions = async (e?: React.FormEvent, customQuery?: string) => {
        e?.preventDefault();
        const query = customQuery || input.trim() || "What are the best crops to grow for the next season to maximize profit?";

        setIsLoading(true);
        setError(null);
        setSuggestions([]);

        try {
            // API key is optional - Hugging Face has a free tier
            const response = await getCropSuggestions(query, apiKey || undefined);

            if (response.error) {
                setError(response.error);
            } else if (response.suggestions) {
                setSuggestions(response.suggestions);
            }
        } catch (err) {
            setError("Failed to get suggestions. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    } as const;

    const itemVariants: any = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 } as const
        }
    } as const;

    return (
        <div className="relative flex flex-col p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="space-y-3 relative z-10">
                <div className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="p-3 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-2xl shadow-inner border border-emerald-500/20"
                    >
                        <TrendingUp className="h-10 w-10 text-emerald-600" />
                    </motion.div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                        {t("suggest.title")}
                    </h1>
                </div>
                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">
                    {t("suggest.subtitle")}
                </p>
            </motion.div>

            {/* Premium Input Section - Restructured for Visibility */}
            <motion.div
                variants={itemVariants}
                className="relative z-20 group"
            >
                <div className="relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white dark:border-slate-800 rounded-[2rem] md:rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-1.5 md:p-2 transition-all duration-500 hover:shadow-emerald-500/10">
                    {/* Animated Inner Border indicator */}
                    <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] p-[2px] pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-emerald-500 via-transparent to-amber-500 animate-gradient-x" />

                    <div className="relative bg-white dark:bg-slate-950 rounded-[1.9rem] md:rounded-[2.9rem] overflow-hidden">
                        <form onSubmit={(e) => handleGetSuggestions(e)} className="relative flex items-center">
                            <div className="absolute left-5 md:left-7 text-slate-400 group-focus-within:text-emerald-500 transition-all duration-500">
                                <Search className="h-6 w-6 md:h-7 md:w-7" />
                            </div>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t("suggest.placeholder")}
                                className="w-full pl-14 md:pl-20 pr-36 md:pr-48 py-5 md:py-7 bg-transparent text-lg md:text-xl font-semibold outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700 text-slate-900 dark:text-white"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05, x: -5 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={isLoading}
                                className="absolute right-2 md:right-3 px-6 md:px-10 py-3 md:py-5 bg-gradient-to-br from-emerald-600 to-emerald-500 text-white rounded-[1.5rem] md:rounded-[2.2rem] font-black shadow-lg transition-all flex items-center gap-2 md:gap-3 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="h-4 w-4 md:h-5 md:w-5 border-2 md:border-3 border-white/30 border-t-white rounded-full"
                                    />
                                ) : (
                                    <>
                                        <span className="hidden sm:inline">Explore</span> <Zap className="h-4 w-4 md:h-5 md:w-5 fill-white" />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <div className="px-5 md:px-7 pb-4 md:pb-5 pt-0.5 flex flex-wrap gap-2 md:gap-3 items-center">
                            <span className="text-[9px] md:text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] mr-1 md:mr-2 flex items-center gap-1.5 md:gap-2">
                                <Sparkles className="h-2.5 w-2.5 md:h-3 md:w-3 text-emerald-500" /> Suggested:
                            </span>
                            {["Profit Maximizer", "Low Risk", "Fast Growth"].map((tag) => (
                                <motion.button
                                    key={tag}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => { setInput(tag); handleGetSuggestions(undefined, tag); }}
                                    className="px-3 md:px-5 py-1.5 md:py-2 bg-slate-100 dark:bg-slate-900/50 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 text-slate-600 dark:text-slate-400 rounded-full text-[10px] md:text-xs font-bold transition-all border border-transparent hover:border-emerald-400/50"
                                >
                                    {tag}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-rose-50/80 dark:bg-rose-950/30 backdrop-blur-xl text-rose-600 dark:text-rose-400 p-6 rounded-[2rem] flex items-center gap-4 border border-rose-100 dark:border-rose-900 shadow-2xl shadow-rose-500/10"
                    >
                        <div className="p-3 bg-rose-100 dark:bg-rose-900/50 rounded-2xl">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <span className="text-lg font-bold">{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <motion.div
                                key={`skeleton-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50 rounded-[3rem] p-10 space-y-8 animate-pulse shadow-sm"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="h-16 w-16 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
                                    <div className="h-8 w-28 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                </div>
                                <div className="space-y-4">
                                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4" />
                                    <div className="space-y-2">
                                        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full" />
                                        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-5/6" />
                                    </div>
                                </div>
                                <div className="pt-6 grid grid-cols-2 gap-6">
                                    <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-3xl" />
                                    <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-3xl" />
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        suggestions.map((crop, idx) => (
                            <motion.div
                                key={crop.name}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", damping: 20, stiffness: 100, delay: idx * 0.1 }}
                                whileHover={{ y: -12, scale: 1.02 }}
                                className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] overflow-hidden flex flex-col shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(16,185,129,0.15)] transition-all duration-700"
                            >
                                <div className="h-52 overflow-hidden relative">
                                    <img
                                        src={`https://source.unsplash.com/featured/?${crop.name.toLowerCase()}`}
                                        alt={crop.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400&h=300";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-amber-500/[0.02] pointer-events-none" />

                                <div className="p-8 space-y-4 flex-1 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <motion.div
                                            whileHover={{ rotate: [-10, 10, -10], scale: 1.2 }}
                                            className="p-5 bg-emerald-50 dark:bg-emerald-900/30 rounded-[2rem] text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-700 shadow-sm"
                                        >
                                            <Sprout className="h-9 w-9" />
                                        </motion.div>
                                        <div className="px-5 py-2 bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-[10px] font-black rounded-full uppercase tracking-[0.3em] border border-slate-100 dark:border-slate-700 shadow-sm">
                                            Peak Pick
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                                            {crop.name}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed font-medium line-clamp-4">
                                            {crop.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-10 bg-slate-50/40 dark:bg-slate-800/40 backdrop-blur-xl border-t border-slate-100/50 dark:border-slate-800/50 space-y-8 relative z-10">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-3">
                                                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Investment
                                            </span>
                                            <p className="text-lg font-black text-slate-900 dark:text-white">{crop.budget}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-3">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Timeframe
                                            </span>
                                            <p className="text-lg font-black text-slate-900 dark:text-white">{crop.duration}</p>
                                        </div>
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        className="relative p-7 bg-slate-900 dark:bg-emerald-600 rounded-[2rem] shadow-2xl overflow-hidden group/btn"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 dark:opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                                        <div className="relative z-10">
                                            <span className="text-[10px] font-black text-emerald-400 dark:text-emerald-100/60 uppercase tracking-[0.2em] mb-1 block">
                                                Est. Harvest Value
                                            </span>
                                            <p className="text-4xl font-black text-white leading-none tracking-tight">
                                                {crop.profit}
                                            </p>
                                        </div>
                                        <motion.div
                                            animate={{ x: [-20, 20], opacity: [0, 1, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="absolute top-0 right-10 bottom-0 w-20 bg-white/10 skew-x-12 blur-xl"
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>

                {!isLoading && suggestions.length === 0 && !error && (
                    <motion.div
                        variants={itemVariants}
                        className="col-span-full py-32 text-center"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="bg-gradient-to-br from-emerald-500/10 to-amber-500/5 dark:from-emerald-600/10 dark:to-emerald-900/10 w-32 h-32 rounded-[3.5rem] flex items-center justify-center mx-auto border-2 border-emerald-100 dark:border-emerald-800 shadow-inner mb-8"
                        >
                            <Sprout className="h-14 w-14 text-emerald-600/40" />
                        </motion.div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-800 dark:text-slate-200">Awaiting Your Input</h2>
                            <p className="text-slate-400 dark:text-slate-600 max-w-sm mx-auto font-medium">Specify your land area, budget, or preferred season to generate custom botanical suggestions.</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
