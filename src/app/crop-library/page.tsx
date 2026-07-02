"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Sprout,
    Droplets,
    Bug,
    FlaskConical,
    Sun,
    Search,
    ChevronDown,
    ChevronUp,
    Calendar,
    Layers,
    ThermometerSun,
    Wheat
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { localizedCrops } from "@/lib/localized-crops";




const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } as const },
};

const severityColor: Record<string, string> = {
    High: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    Medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Low: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

export default function CropLibraryPage() {
    const { t, lang } = useLanguage();
    const crops = (localizedCrops as Record<string, any>)[lang] || localizedCrops.en;
    const [search, setSearch] = useState("");
    const [selectedCrop, setSelectedCrop] = useState(crops[0]);
    const [activeTab, setActiveTab] = useState("seasonality");

    const tabs = [
        { id: "seasonality", label: t("library.seasonality"), icon: Calendar },
        { id: "soil", label: t("library.soil"), icon: Layers },
        { id: "irrigation", label: t("library.irrigation"), icon: Droplets },
        { id: "pests", label: t("library.pests"), icon: Bug },
        { id: "fertilizer", label: t("library.fertilizer"), icon: FlaskConical },
    ];

    const filtered = crops.filter((c: any) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl">
                        <BookOpen className="h-9 w-9 text-emerald-600" />
                    </div>
                    {t("nav.croplibrary")}
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                    {t("library.subtitle")}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Panel – Crop List */}
                <motion.div variants={itemVariants} className="lg:col-span-1 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            id="crop-search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={t("library.search")}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        {filtered.map((crop: any) => (
                            <button
                                key={crop.id}
                                id={`crop-btn-${crop.id}`}
                                onClick={() => setSelectedCrop(crop)}
                                className={cn(
                                    "w-full flex items-center gap-3 p-4 rounded-2xl border text-left transition-all duration-200",
                                    selectedCrop.id === crop.id
                                        ? "bg-emerald-500/10 border-emerald-500/30 shadow-md shadow-emerald-500/10"
                                        : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-emerald-400/30"
                                )}
                            >
                                <span className="text-2xl">{crop.emoji}</span>
                                <div>
                                    <p className={cn("font-black text-sm", selectedCrop.id === crop.id ? "text-emerald-700 dark:text-emerald-400" : "text-slate-900 dark:text-white")}>{crop.name}</p>
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{crop.category}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Right Panel – Detail */}
                <motion.div variants={itemVariants} className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                    {/* Crop Header */}
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center gap-5 bg-gradient-to-r from-emerald-500/5 to-transparent">
                        <span className="text-5xl">{selectedCrop.emoji}</span>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white">{selectedCrop.name}</h2>
                            <span className="inline-block mt-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                                {selectedCrop.category}
                            </span>
                        </div>
                    </div>

                    {/* Tab Nav */}
                    <div className="flex gap-1 p-4 border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                id={`tab-${tab.id}`}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                    activeTab === tab.id
                                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                                        : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                                )}
                            >
                                <tab.icon className="h-3.5 w-3.5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab + selectedCrop.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="p-8 space-y-5"
                        >
                            {activeTab === "seasonality" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { label: t("library.sowingMonths"), value: selectedCrop.seasonality.sowingMonths, icon: Sprout, color: "text-emerald-600", bg: "bg-emerald-500/10" },
                                        { label: t("library.harvestMonths"), value: selectedCrop.seasonality.harvestMonths, icon: Wheat, color: "text-amber-600", bg: "bg-amber-500/10" },
                                        { label: t("library.duration"), value: selectedCrop.seasonality.duration, icon: Calendar, color: "text-blue-600", bg: "bg-blue-500/10" },
                                        { label: t("library.climate"), value: selectedCrop.seasonality.climate, icon: ThermometerSun, color: "text-rose-500", bg: "bg-rose-500/10" },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                                            <div className={cn("p-3 rounded-xl shrink-0", item.bg)}>
                                                <item.icon className={cn("h-5 w-5", item.color)} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === "soil" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { label: t("library.soilType"), value: selectedCrop.soil.type },
                                        { label: t("library.phRange"), value: selectedCrop.soil.ph },
                                        { label: t("library.organicMatter"), value: selectedCrop.soil.organic },
                                        { label: t("library.drainage"), value: selectedCrop.soil.drainage },
                                    ].map((item) => (
                                        <div key={item.label} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === "irrigation" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { label: t("library.frequency"), value: selectedCrop.irrigation.frequency },
                                        { label: t("library.criticalStages"), value: selectedCrop.irrigation.critical },
                                        { label: t("library.totalReq"), value: selectedCrop.irrigation.requirement },
                                        { label: t("library.recMethod"), value: selectedCrop.irrigation.method },
                                    ].map((item) => (
                                        <div key={item.label} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === "pests" && (
                                <div className="space-y-4">
                                    {selectedCrop.pests.map((pest: any) => (
                                        <div key={pest.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                                            <div className="flex items-start gap-4">
                                                <div className="p-2.5 bg-rose-500/10 rounded-xl shrink-0">
                                                    <Bug className="h-5 w-5 text-rose-600" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 dark:text-white text-sm">{pest.name}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{pest.control}</p>
                                                </div>
                                            </div>
                                            <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shrink-0", severityColor[pest.severity] || severityColor.Low)}>
                                                {pest.severity}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === "fertilizer" && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-100 dark:border-slate-800">
                                                <th className="text-left py-3 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">{t("library.stage")}</th>
                                                <th className="text-center py-3 px-4 text-[10px] font-black uppercase tracking-widest text-blue-500">{t("library.nitrogen")}</th>
                                                <th className="text-center py-3 px-4 text-[10px] font-black uppercase tracking-widest text-amber-500">{t("library.phosphorus")}</th>
                                                <th className="text-center py-3 px-4 text-[10px] font-black uppercase tracking-widest text-emerald-500">{t("library.potassium")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedCrop.fertilizer.map((row: any, i: number) => (
                                                <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-emerald-500/3 transition-colors">
                                                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">{row.stage}</td>
                                                    <td className="py-4 px-4 text-center font-medium text-slate-600 dark:text-slate-300">{row.n}</td>
                                                    <td className="py-4 px-4 text-center font-medium text-slate-600 dark:text-slate-300">{row.p}</td>
                                                    <td className="py-4 px-4 text-center font-medium text-slate-600 dark:text-slate-300">{row.k}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}
