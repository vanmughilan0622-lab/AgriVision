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

const crops = [
    {
        id: "wheat",
        name: "Wheat",
        emoji: "🌾",
        category: "Cereal",
        seasonality: {
            sowingMonths: "October – November",
            harvestMonths: "March – April",
            duration: "120–150 days",
            climate: "Cool & dry winters, mild summers",
        },
        soil: {
            type: "Well-drained loamy or clay-loam",
            ph: "6.0 – 7.5",
            organic: "Medium to high organic matter",
            drainage: "Good drainage required",
        },
        irrigation: {
            frequency: "4–6 irrigations",
            critical: "Crown root initiation, Tillering, Jointing, Grain filling",
            requirement: "35–40 cm total water",
            method: "Flood or drip irrigation",
        },
        pests: [
            { name: "Aphids", severity: "High", control: "Spray Chlorpyriphos 20 EC @ 1 L/ha" },
            { name: "Stem Rust", severity: "Medium", control: "Apply Propiconazole 25 EC" },
            { name: "Brown Rust", severity: "Medium", control: "Mancozeb 75 WP @ 2 kg/ha" },
        ],
        fertilizer: [
            { stage: "Basal (at planting)", n: "60 kg/ha", p: "60 kg/ha", k: "40 kg/ha" },
            { stage: "Tillering stage", n: "40 kg/ha", p: "—", k: "—" },
            { stage: "Heading stage", n: "20 kg/ha", p: "—", k: "—" },
        ],
    },
    {
        id: "rice",
        name: "Rice",
        emoji: "🌾",
        category: "Cereal",
        seasonality: {
            sowingMonths: "June – July (Kharif), Nov–Dec (Rabi)",
            harvestMonths: "October – November / March",
            duration: "90–120 days",
            climate: "Hot humid; 25–35°C with heavy rainfall",
        },
        soil: {
            type: "Heavy clay or silty-loam",
            ph: "5.5 – 7.0",
            organic: "High water retention essential",
            drainage: "Poor drainage / waterlogged",
        },
        irrigation: {
            frequency: "Continuous flooding or AWD",
            critical: "Transplanting, Tillering, Panicle initiation, Flowering",
            requirement: "100–200 cm water",
            method: "Flood / Alternate Wetting & Drying (AWD)",
        },
        pests: [
            { name: "Brown Planthopper", severity: "High", control: "Imidacloprid 17.8 SL @ 125 ml/ha" },
            { name: "Stem Borer", severity: "High", control: "Cartap Hydrochloride 4G @ 18 kg/ha" },
            { name: "Blast Disease", severity: "Medium", control: "Tricyclazole 75 WP @ 500 g/ha" },
        ],
        fertilizer: [
            { stage: "Basal (transplanting)", n: "40 kg/ha", p: "30 kg/ha", k: "30 kg/ha" },
            { stage: "Active tillering (21 DAT)", n: "40 kg/ha", p: "—", k: "—" },
            { stage: "Panicle initiation", n: "20 kg/ha", p: "—", k: "20 kg/ha" },
        ],
    },
    {
        id: "tomato",
        name: "Tomato",
        emoji: "🍅",
        category: "Vegetable",
        seasonality: {
            sowingMonths: "June–July / October–November",
            harvestMonths: "September–November / January–March",
            duration: "70–90 days from transplant",
            climate: "21–27°C; moderate rainfall",
        },
        soil: {
            type: "Sandy loam to loamy",
            ph: "6.0 – 7.0",
            organic: "Rich in organic matter",
            drainage: "Well-drained, deep soil",
        },
        irrigation: {
            frequency: "Every 5–7 days",
            critical: "Transplanting, Flowering, Fruit set",
            requirement: "40–60 cm total water",
            method: "Drip irrigation preferred",
        },
        pests: [
            { name: "Tomato Leaf Curl Virus", severity: "High", control: "Control whitefly vector; Imidacloprid 200 SL" },
            { name: "Early Blight", severity: "High", control: "Chlorothalonil 75 WP @ 2 kg/ha" },
            { name: "Fruit Borer", severity: "Medium", control: "Spinosad 45 SC @ 150 ml/ha" },
        ],
        fertilizer: [
            { stage: "Basal", n: "50 kg/ha", p: "50 kg/ha", k: "50 kg/ha" },
            { stage: "30 days after transplant", n: "30 kg/ha", p: "—", k: "25 kg/ha" },
            { stage: "Fruit development", n: "20 kg/ha", p: "—", k: "25 kg/ha" },
        ],
    },
    {
        id: "corn",
        name: "Corn (Maize)",
        emoji: "🌽",
        category: "Cereal",
        seasonality: {
            sowingMonths: "June – July (Kharif), Jan–Feb (Rabi)",
            harvestMonths: "September – October / April–May",
            duration: "90–110 days",
            climate: "Warm climate; 20–30°C",
        },
        soil: {
            type: "Loam or sandy-loam",
            ph: "5.8 – 7.0",
            organic: "High organic matter",
            drainage: "Well-drained",
        },
        irrigation: {
            frequency: "6–8 irrigations",
            critical: "Germination, Knee-high, Tasseling, Grain fill",
            requirement: "50–70 cm water",
            method: "Furrow or drip",
        },
        pests: [
            { name: "Fall Armyworm", severity: "High", control: "Spinetoram 11.7 SC @ 500 ml/ha" },
            { name: "Stem Borer", severity: "High", control: "Carbofuran 3G @ 20 kg/ha" },
            { name: "Maize Streak Virus", severity: "Medium", control: "Control leafhopper; resistant varieties" },
        ],
        fertilizer: [
            { stage: "Basal", n: "60 kg/ha", p: "60 kg/ha", k: "40 kg/ha" },
            { stage: "Knee-high stage (V6)", n: "60 kg/ha", p: "—", k: "—" },
            { stage: "Tasseling (V12)", n: "30 kg/ha", p: "—", k: "20 kg/ha" },
        ],
    },
    {
        id: "cotton",
        name: "Cotton",
        emoji: "🌿",
        category: "Cash Crop",
        seasonality: {
            sowingMonths: "April – June",
            harvestMonths: "October – January",
            duration: "150–180 days",
            climate: "Hot & semi-arid; 25–35°C",
        },
        soil: {
            type: "Black cotton soil or loamy",
            ph: "7.0 – 8.0",
            organic: "Moderate organic content",
            drainage: "Deep, well-drained",
        },
        irrigation: {
            frequency: "8–10 irrigations",
            critical: "Germination, Squaring, Flowering, Boll formation",
            requirement: "60–90 cm water",
            method: "Furrow or drip irrigation",
        },
        pests: [
            { name: "Bollworm (Pink/American)", severity: "High", control: "Pyrethroid + organophosphate combo sprays" },
            { name: "Whitefly", severity: "High", control: "Thiamethoxam 25 WG @ 100 g/ha" },
            { name: "Aphid", severity: "Medium", control: "Dimethoate 30 EC @ 1 L/ha" },
        ],
        fertilizer: [
            { stage: "Basal", n: "30 kg/ha", p: "60 kg/ha", k: "30 kg/ha" },
            { stage: "Squaring (45 DAS)", n: "30 kg/ha", p: "—", k: "—" },
            { stage: "Flowering (75 DAS)", n: "30 kg/ha", p: "—", k: "30 kg/ha" },
        ],
    },
    {
        id: "soybean",
        name: "Soybean",
        emoji: "🫘",
        category: "Pulse",
        seasonality: {
            sowingMonths: "June – July",
            harvestMonths: "September – October",
            duration: "90–100 days",
            climate: "Warm humid; 20–30°C",
        },
        soil: {
            type: "Loam to clay-loam",
            ph: "6.0 – 7.5",
            organic: "High organic matter",
            drainage: "Well-drained",
        },
        irrigation: {
            frequency: "3–4 critical irrigations",
            critical: "Germination, Pod formation, Seed filling",
            requirement: "30–45 cm water",
            method: "Sprinkler or furrow",
        },
        pests: [
            { name: "Pod Borer", severity: "High", control: "Quinalphos 25 EC @ 2 L/ha" },
            { name: "Yellow Mosaic Virus", severity: "High", control: "Control whitefly; resistant varieties" },
            { name: "Stem Fly", severity: "Medium", control: "Carbosulfan seed treatment" },
        ],
        fertilizer: [
            { stage: "Basal (rhizobium inoculation)", n: "20 kg/ha", p: "60 kg/ha", k: "40 kg/ha" },
            { stage: "Flower initiation", n: "—", p: "20 kg/ha", k: "20 kg/ha" },
        ],
    },
];

const tabs = [
    { id: "seasonality", label: "Seasonality", icon: Calendar },
    { id: "soil", label: "Soil", icon: Layers },
    { id: "irrigation", label: "Irrigation", icon: Droplets },
    { id: "pests", label: "Pests", icon: Bug },
    { id: "fertilizer", label: "Fertilizer", icon: FlaskConical },
];

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
    const [search, setSearch] = useState("");
    const [selectedCrop, setSelectedCrop] = useState(crops[0]);
    const [activeTab, setActiveTab] = useState("seasonality");

    const filtered = crops.filter((c) =>
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
                    Crop{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                        Library
                    </span>
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                    Complete reference for seasonality, soil, irrigation, pest management, and fertilizer schedules.
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
                            placeholder="Search crops..."
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        {filtered.map((crop) => (
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
                                        { label: "Sowing Months", value: selectedCrop.seasonality.sowingMonths, icon: Sprout, color: "text-emerald-600", bg: "bg-emerald-500/10" },
                                        { label: "Harvest Months", value: selectedCrop.seasonality.harvestMonths, icon: Wheat, color: "text-amber-600", bg: "bg-amber-500/10" },
                                        { label: "Duration", value: selectedCrop.seasonality.duration, icon: Calendar, color: "text-blue-600", bg: "bg-blue-500/10" },
                                        { label: "Climate", value: selectedCrop.seasonality.climate, icon: ThermometerSun, color: "text-rose-500", bg: "bg-rose-500/10" },
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
                                        { label: "Soil Type", value: selectedCrop.soil.type },
                                        { label: "pH Range", value: selectedCrop.soil.ph },
                                        { label: "Organic Matter", value: selectedCrop.soil.organic },
                                        { label: "Drainage", value: selectedCrop.soil.drainage },
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
                                        { label: "Frequency", value: selectedCrop.irrigation.frequency },
                                        { label: "Critical Stages", value: selectedCrop.irrigation.critical },
                                        { label: "Total Requirement", value: selectedCrop.irrigation.requirement },
                                        { label: "Recommended Method", value: selectedCrop.irrigation.method },
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
                                    {selectedCrop.pests.map((pest) => (
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
                                            <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shrink-0", severityColor[pest.severity])}>
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
                                                <th className="text-left py-3 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Stage</th>
                                                <th className="text-center py-3 px-4 text-[10px] font-black uppercase tracking-widest text-blue-500">N (Nitrogen)</th>
                                                <th className="text-center py-3 px-4 text-[10px] font-black uppercase tracking-widest text-amber-500">P (Phosphorus)</th>
                                                <th className="text-center py-3 px-4 text-[10px] font-black uppercase tracking-widest text-emerald-500">K (Potassium)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedCrop.fertilizer.map((row, i) => (
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
