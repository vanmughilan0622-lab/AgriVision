"use client";

import { useState, useEffect } from "react";
import { Upload, ScanLine, X, Check, AlertCircle, Loader2, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { analyzePlantImage } from "@/app/actions/analyze-hf";
import { useLanguage } from "@/lib/language-context";

function cleanText(raw: string): string {
    return raw
        .replace(/#{1,6}\s?/g, "")
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/__(.+?)__/g, "$1")
        .replace(/_(.+?)_/g, "$1")
        .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, "").trim())
        .replace(/^\s*[-*+]\s+/gm, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

function renderInsight(text: string) {
    const cleaned = cleanText(text);
    const paragraphs = cleaned.split(/\n\n+/).filter(Boolean);
    return paragraphs.map((para, i) => (
        <p key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium text-[15px]">
            {para.trim()}
        </p>
    ));
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 } as const
    }
};

export default function DiseaseDetection() {
    const { t } = useLanguage();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [result, setResult] = useState<{
        disease: string;
        confidence: number;
        description: string;
        treatment: string[];
    } | null>(null);

    useEffect(() => {
        const key = localStorage.getItem("huggingface_api_key");
        setApiKey(key);
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
                setResult(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async () => {
        if (!selectedImage) return;
        setIsAnalyzing(true);
        setError(null);
        setResult(null);

        try {
            const analysis = await analyzePlantImage(selectedImage, apiKey || undefined);
            if (analysis.error) {
                setError(analysis.error);
            } else {
                setResult(analysis);
            }
        } catch (err) {
            setError("Analysis failed. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 md:p-10 max-w-7xl mx-auto space-y-10"
        >
            <motion.div variants={itemVariants} className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-3 text-slate-900 dark:text-white">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl">
                        <ScanLine className="h-8 w-8 text-emerald-600" />
                    </div>
                    Disease <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">{t("disease.title").split(" ")[1] || "Detection"}</span>
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
                    High-precision AI diagnostics for agricultural resilience. <span className="text-emerald-600 dark:text-emerald-400 font-black">{t("disease.subtitle")}</span>
                </p>
            </motion.div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-rose-500/10 text-rose-600 p-4 rounded-2xl flex items-center gap-3 border border-rose-500/20 font-bold"
                >
                    <AlertCircle className="h-5 w-5" />
                    {error}
                </motion.div>
            )}

            <div className="grid lg:grid-cols-2 gap-10">
                {/* Upload Section */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <div className="relative">
                        <div className={cn(
                            "relative group aspect-[4/3] rounded-[2.5rem] flex flex-col items-center justify-center transition-all duration-700 overflow-hidden bg-white dark:bg-slate-900 shadow-2xl border-2",
                            selectedImage ? "border-emerald-500/50" : "border-slate-100 dark:border-slate-800 border-dashed"
                        )}>
                            {selectedImage ? (
                                <div className="relative w-full h-full p-4">
                                    <img src={selectedImage} alt="Plant" className="h-full w-full object-cover rounded-[1.8rem]" />
                                    <button
                                        onClick={() => { setSelectedImage(null); setResult(null); }}
                                        className="absolute top-8 right-8 p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-xl"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>

                                    <AnimatePresence>
                                        {isAnalyzing && (
                                            <motion.div
                                                initial={{ top: "0%" }}
                                                animate={{ top: "100%" }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_20px_rgba(16,185,129,0.8)] z-20 pointer-events-none"
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <label id="upload-plant-image" className="flex flex-col items-center justify-center cursor-pointer w-full h-full hover:bg-emerald-500/5 transition-all duration-500 group">
                                    <div className="p-8 bg-emerald-500/5 rounded-[2rem] group-hover:scale-110 transition-transform duration-500 group-hover:bg-emerald-500/10">
                                        <Upload className="h-16 w-16 text-emerald-500/50 group-hover:text-emerald-500" />
                                    </div>
                                    <span className="mt-8 text-xl font-black text-slate-400 group-hover:text-emerald-600 transition-colors">{t("disease.uploadLabel")}</span>
                                    <span className="text-xs font-bold text-slate-300 dark:text-slate-600 mt-2 uppercase tracking-widest">JPG • PNG • WEBP</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </label>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={analyzeImage}
                            disabled={!selectedImage || isAnalyzing}
                            className={cn(
                                "w-full mt-5 py-6 rounded-[1.8rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all text-sm",
                                !selectedImage || isAnalyzing
                                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-inner"
                                    : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_20px_40px_-10px_rgba(5,150,105,0.4)]"
                            )}
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                    {t("disease.analysing")}
                                </>
                            ) : (
                                <>
                                    <Zap className="h-6 w-6 fill-white" />
                                    {t("disease.initiate")}
                                </>
                            )}
                        </motion.button>
                    </div>
                </motion.div>

                {/* Results Section */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
                            >
                                <div className={cn("p-10 border-b", result.disease.toLowerCase().includes("healthy") ? "bg-emerald-500/5" : "bg-rose-500/5")}>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <Sparkles className="h-5 w-5 text-emerald-500" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{t("disease.verdict")}</span>
                                            </div>
                                            <h2 className={cn("text-2xl font-black leading-snug", result.disease.toLowerCase().includes("healthy") ? "text-emerald-700 dark:text-emerald-400" : "text-rose-600")}>
                                                {cleanText(result.disease)}
                                            </h2>
                                            <div className="flex items-center gap-2 mt-4">
                                                <div className="px-4 py-1.5 bg-white dark:bg-slate-800 rounded-full border shadow-sm flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span className="text-xs font-black text-slate-600 dark:text-slate-300">{result.confidence}% {t("disease.confidence")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                            <ShieldCheck className="h-4 w-4" /> {t("disease.insight")}
                                        </h3>
                                        <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
                                            {renderInsight(result.description)}
                                        </div>
                                    </div>
                                    {result.treatment && result.treatment.length > 0 && (
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">{t("disease.treatment")}</h3>
                                            <div className="grid gap-2.5">
                                                {result.treatment.map((item, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 0.3 + idx * 0.1 }}
                                                        className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-emerald-500/30 transition-all"
                                                    >
                                                        <div className="mt-0.5 p-1 bg-emerald-500 rounded-full shadow-md shadow-emerald-500/30 shrink-0">
                                                            <Check className="h-3 w-3 text-white" />
                                                        </div>
                                                        <span className="text-[14px] text-slate-700 dark:text-slate-200 font-medium leading-relaxed">{cleanText(item)}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-[2.5rem] border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/10"
                            >
                                <div className="p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] mb-8 relative">
                                    <ScanLine className="h-16 w-16 text-slate-300 dark:text-slate-700" />
                                    <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-400 dark:text-slate-600">{t("disease.awaiting")}</h3>
                                <p className="text-slate-400 dark:text-slate-600 mt-3 font-medium max-w-xs leading-relaxed">
                                    Upload a clear photo of plant foliage to initiate AI-powered disease diagnosis.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}
