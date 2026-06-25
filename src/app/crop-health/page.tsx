"use client";

import { useState } from "react";
import { Sprout, AlertTriangle, Droplets, Calendar, Thermometer, ShieldCheck, X, ChevronDown, ChevronUp, Bug, Zap, Info, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 } as const
    }
};

const anomalyDetails: Record<string, { title: string; desc: string; action: string; severity: "high" | "medium" }[]> = {
    "Corn (Sweet)": [
        {
            title: "Low Soil Moisture",
            desc: "Soil moisture has dropped below 30% in the Corn field. This is below the optimal 40–60% range for vegetative stage corn and may lead to stunted growth and reduced yield.",
            action: "Irrigate immediately with 25mm water. Check drip lines for blockages.",
            severity: "high"
        }
    ],
    "Tomato (Roma)": [
        {
            title: "Early Blight Detected",
            desc: "Dark concentric ring lesions observed on lower leaves, consistent with Alternaria solani infection. High humidity (>80%) in the sector is accelerating spread.",
            action: "Apply Mancozeb 75 WP @ 2g/L. Remove and destroy infected leaves. Avoid overhead irrigation.",
            severity: "high"
        },
        {
            title: "Excess Moisture Alert",
            desc: "Soil moisture is at 85%, above optimal for tomato fruiting stage. Waterlogging increases risk of root rot and blossom end rot.",
            action: "Stop irrigation for 48 hours. Improve drainage channels around the field border.",
            severity: "medium"
        }
    ]
};

const SUGGESTED_CROPS = [
    { name: "Wheat (Winter Variety)", yieldPerAcre: 1.5 },
    { name: "Corn (Sweet)", yieldPerAcre: 3.5 },
    { name: "Tomato (Roma)", yieldPerAcre: 15 },
    { name: "Rice (Basmati)", yieldPerAcre: 2.0 },
    { name: "Potato (Russet)", yieldPerAcre: 12 },
    { name: "Grapes (Vitis)", yieldPerAcre: 6 },
    { name: "Soybeans", yieldPerAcre: 1.2 },
    { name: "Cotton", yieldPerAcre: 0.8 },
    { name: "Sugarcane", yieldPerAcre: 35 },
    { name: "Mango (Alphonso)", yieldPerAcre: 4 },
    { name: "Onion", yieldPerAcre: 8 },
    { name: "Chili (Green)", yieldPerAcre: 3 },
    { name: "Banana", yieldPerAcre: 20 },
    { name: "Chickpea", yieldPerAcre: 0.5 },
    { name: "Groundnut", yieldPerAcre: 1 },
];

export default function CropHealthPage() {
    const { t } = useLanguage();
    const [cropsList, setCropsList] = useState([
        {
            id: 1,
            name: "Wheat (Winter Variety)",
            stage: "Vegetative",
            plantedDate: "2023-11-15",
            health: 92,
            moisture: "Adequate",
            temp: "18°C",
            alerts: 0,
            area: 120,
            estYield: "180 Tons",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800&h=600"
        },
        {
            id: 2,
            name: "Corn (Sweet)",
            stage: "Flowering",
            plantedDate: "2024-01-10",
            health: 78,
            moisture: "Low",
            temp: "22°C",
            alerts: 1,
            area: 85,
            estYield: "297.5 Tons",
            image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800&h=600"
        },
        {
            id: 3,
            name: "Tomato (Roma)",
            stage: "Fruiting",
            plantedDate: "2024-01-05",
            health: 65,
            moisture: "High",
            temp: "24°C",
            alerts: 2,
            area: 15,
            estYield: "225 Tons",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800&h=600"
        },
        {
            id: 4,
            name: "Rice (Basmati)",
            stage: "Seedling",
            plantedDate: "2024-02-01",
            health: 88,
            moisture: "High",
            temp: "26°C",
            alerts: 0,
            area: 200,
            estYield: "400 Tons",
            image: "https://images.unsplash.com/photo-1536633100611-306725359149?auto=format&fit=crop&q=80&w=800&h=600"
        },
        {
            id: 5,
            name: "Potato (Russet)",
            stage: "Tuberization",
            plantedDate: "2024-01-20",
            health: 82,
            moisture: "Adequate",
            temp: "16°C",
            alerts: 0,
            area: 40,
            estYield: "480 Tons",
            image: "https://images.unsplash.com/photo-1518977676601-b53f02ac10dd?auto=format&fit=crop&q=80&w=800&h=600"
        },
        {
            id: 6,
            name: "Grapes (Vitis)",
            stage: "Dormancy",
            plantedDate: "2023-12-05",
            health: 95,
            moisture: "Low",
            temp: "12°C",
            alerts: 0,
            area: 25,
            estYield: "150 Tons",
            image: "https://images.unsplash.com/photo-1537613531460-e85d9539266a?auto=format&fit=crop&q=80&w=800&h=600"
        }
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [newCropName, setNewCropName] = useState("");
    const [landArea, setLandArea] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState<typeof cropsList[0] | null>(null);
    const [expandedAnomalyId, setExpandedAnomalyId] = useState<number | null>(null);

    const filteredSuggestions = SUGGESTED_CROPS.filter(c => 
        c.name.toLowerCase().includes(newCropName.toLowerCase())
    );

    const handleAddCrop = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newCropName.trim() || !landArea.trim()) return;

        const areaVal = parseFloat(landArea) || 0;
        const matchedCrop = SUGGESTED_CROPS.find(c => c.name.toLowerCase() === newCropName.toLowerCase());
        const yieldFactor = matchedCrop ? matchedCrop.yieldPerAcre : 2.0; // default 2.0 tons/acre if unknown
        const estYield = areaVal * yieldFactor;

        const newCrop = {
            id: Date.now(),
            name: newCropName.trim(),
            stage: "Inception",
            plantedDate: new Date().toISOString().split('T')[0],
            health: 100,
            moisture: "Adequate",
            temp: "20°C",
            alerts: 0,
            area: areaVal,
            estYield: `${estYield.toFixed(1)} Tons`,
            image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800&h=600"
        };

        setCropsList([newCrop, ...cropsList]);
        setNewCropName("");
        setLandArea("");
        setIsAdding(false);
        setShowSuggestions(false);
    };

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-4 md:p-8 space-y-12 max-w-7xl mx-auto"
            >
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                            Crop <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Hub</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
                            Critical biometric monitoring and specimen health orchestration.
                        </p>
                    </div>
                    {!isAdding ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsAdding(true)}
                            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-[1.5rem] font-black hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-500/20 active:scale-95"
                        >
                            {t("health.addCrop")}
                        </motion.button>
                    ) : (
                        <div className="relative">
                            <motion.form
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                onSubmit={handleAddCrop}
                                className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-xl relative z-40"
                            >
                                <div className="relative w-full sm:w-auto">
                                    <input
                                        value={newCropName}
                                        onChange={(e) => {
                                            setNewCropName(e.target.value);
                                            setShowSuggestions(true);
                                        }}
                                        onFocus={() => setShowSuggestions(true)}
                                        placeholder="Enter crop name..."
                                        autoFocus
                                        className="w-full bg-transparent border-none outline-none px-4 py-2 font-bold text-slate-900 dark:text-white min-w-[200px]"
                                    />
                                    <AnimatePresence>
                                        {showSuggestions && newCropName && filteredSuggestions.length > 0 && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full left-0 mt-2 w-full sm:w-[240px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden"
                                            >
                                                {filteredSuggestions.map((suggestion, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => {
                                                            setNewCropName(suggestion.name);
                                                            setShowSuggestions(false);
                                                        }}
                                                        className="w-full text-left px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                                                    >
                                                        {suggestion.name}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                                <input
                                    type="number"
                                    value={landArea}
                                    onChange={(e) => setLandArea(e.target.value)}
                                    placeholder="Land Area (Acres)"
                                    className="bg-transparent border-none outline-none px-4 py-2 font-bold text-slate-900 dark:text-white min-w-[150px]"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all w-full sm:w-auto mt-2 sm:mt-0"
                                >
                                    Confirm
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsAdding(false);
                                        setShowSuggestions(false);
                                        setNewCropName("");
                                        setLandArea("");
                                    }}
                                    className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all w-full sm:w-auto mt-2 sm:mt-0"
                                >
                                    Cancel
                                </button>
                            </motion.form>
                        </div>
                    )}
                </motion.div>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                    {cropsList.map((crop, idx) => (
                        <motion.div
                            key={crop.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 24, delay: Math.min(idx * 0.1, 0.3) }}
                            whileHover={{ y: -10 }}
                            className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transition-shadow duration-500"
                        >
                            <div className="h-56 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                                <img
                                    src={crop.image}
                                    alt={crop.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://source.unsplash.com/featured/?${crop.name.split(' ')[0].toLowerCase()}`;
                                    }}
                                />
                                <div className="absolute top-5 right-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[10px] font-black tracking-widest uppercase border border-white/20 shadow-xl">
                                    {crop.stage}
                                </div>
                            </div>

                            <div className="p-7 space-y-6 flex-1 flex flex-col">
                                <div className="space-y-1">
                                    <h3 className="font-black text-xl text-slate-900 dark:text-white">{crop.name}</h3>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                        <Calendar className="h-3 w-3" />
                                        Planted: {crop.plantedDate}
                                    </div>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Health Index</span>
                                            <div className="text-2xl font-black text-slate-900 dark:text-white">{crop.health}%</div>
                                        </div>
                                        <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${crop.health}%` }}
                                                className={cn("h-full rounded-full transition-all duration-1000",
                                                    crop.health > 80 ? "bg-gradient-to-r from-emerald-600 to-emerald-400" :
                                                        crop.health > 60 ? "bg-gradient-to-r from-amber-600 to-amber-400" :
                                                            "bg-gradient-to-r from-rose-600 to-rose-400"
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-50 dark:border-slate-800">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                                <Droplets className="h-3 w-3 text-blue-500" /> Moisture
                                            </span>
                                            <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">{crop.moisture}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                                <Thermometer className="h-3 w-3 text-amber-500" /> Temp
                                            </span>
                                            <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">{crop.temp}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                                <Layers className="h-3 w-3 text-indigo-500" /> Area
                                            </span>
                                            <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">{crop.area} Acres</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                                <Sprout className="h-3 w-3 text-emerald-500" /> Est. Yield
                                            </span>
                                            <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">{crop.estYield}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Anomaly section */}
                                {crop.alerts > 0 && (
                                    <div className="space-y-2">
                                        <button
                                            id={`expand-anomaly-${crop.id}`}
                                            onClick={() => setExpandedAnomalyId(expandedAnomalyId === crop.id ? null : crop.id)}
                                            className="w-full flex items-center justify-between p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-2xl"
                                        >
                                            <div className="flex items-center gap-2">
                                                <AlertTriangle className="h-4 w-4 text-rose-600" />
                                                <span className="text-xs font-black text-rose-600 uppercase tracking-widest">{crop.alerts} Anomal{crop.alerts === 1 ? "y" : "ies"} Detected</span>
                                            </div>
                                            {expandedAnomalyId === crop.id ? <ChevronUp className="h-4 w-4 text-rose-500" /> : <ChevronDown className="h-4 w-4 text-rose-500" />}
                                        </button>

                                        <AnimatePresence>
                                            {expandedAnomalyId === crop.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden space-y-2"
                                                >
                                                    {(anomalyDetails[crop.name] || []).map((a, i) => (
                                                        <div key={i} className={cn("p-4 rounded-2xl border space-y-2", a.severity === "high" ? "bg-rose-500/5 border-rose-500/20" : "bg-amber-500/5 border-amber-500/20")}>
                                                            <div className="flex items-center gap-2">
                                                                <Bug className={cn("h-4 w-4", a.severity === "high" ? "text-rose-600" : "text-amber-600")} />
                                                                <p className={cn("text-xs font-black uppercase tracking-wider", a.severity === "high" ? "text-rose-600" : "text-amber-600")}>{a.title}</p>
                                                            </div>
                                                            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{a.desc}</p>
                                                            <div className="flex items-start gap-2 pt-1">
                                                                <Zap className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                                                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">{a.action}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}

                                <button onClick={() => setSelectedCrop(crop)} className="w-full py-4 bg-slate-900 text-white dark:bg-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedCrop && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedCrop(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 30, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 24 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden max-w-lg w-full border border-slate-100 dark:border-slate-800"
                        >
                            <div className="h-52 overflow-hidden relative">
                                <img src={selectedCrop.image} alt={selectedCrop.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                                <button onClick={() => setSelectedCrop(null)} className="absolute top-5 right-5 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/40 transition-all">
                                    <X className="h-5 w-5" />
                                </button>
                                <div className="absolute bottom-5 left-7">
                                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">{selectedCrop.stage}</p>
                                    <h2 className="text-3xl font-black text-white">{selectedCrop.name}</h2>
                                </div>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Calendar className="h-3 w-3" /> Planted</span>
                                        <p className="font-bold text-slate-800 dark:text-slate-200">{selectedCrop.plantedDate}</p>
                                    </div>
                                    <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> Health</span>
                                        <p className="font-bold text-slate-800 dark:text-slate-200">{selectedCrop.health}%</p>
                                    </div>
                                    <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Droplets className="h-3 w-3 text-blue-500" /> Moisture</span>
                                        <p className="font-bold text-slate-800 dark:text-slate-200">{selectedCrop.moisture}</p>
                                    </div>
                                    <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Thermometer className="h-3 w-3 text-amber-500" /> Temperature</span>
                                        <p className="font-bold text-slate-800 dark:text-slate-200">{selectedCrop.temp}</p>
                                    </div>
                                </div>
                                {selectedCrop.alerts > 0 && anomalyDetails[selectedCrop.name] && (
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-rose-500" /> Active Anomalies</p>
                                        {anomalyDetails[selectedCrop.name].map((a, i) => (
                                            <div key={i} className={cn("p-4 rounded-2xl border", a.severity === "high" ? "bg-rose-500/5 border-rose-500/20" : "bg-amber-500/5 border-amber-500/20")}>
                                                <p className={cn("text-xs font-black mb-1", a.severity === "high" ? "text-rose-600" : "text-amber-600")}>{a.title}</p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{a.desc}</p>
                                                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold mt-2">Action: {a.action}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
