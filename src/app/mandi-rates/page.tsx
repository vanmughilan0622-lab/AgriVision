"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp, TrendingDown, Minus, MapPin, RefreshCw, Search, BarChart3, IndianRupee, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "@/lib/location-context";
import { useLanguage } from "@/lib/language-context";

const indiaStatesDistricts: Record<string, string[]> = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Kadapa", "Anantapur"],
    "Assam": ["Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Nagaon", "Tezpur"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Arrah", "Begusarai", "Kishanganj"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Anand"],
    "Haryana": ["Gurugram", "Faridabad", "Ambala", "Hisar", "Karnal", "Rohtak", "Panipat", "Sirsa"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamsala", "Kullu", "Solan", "Mandi"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Giridih"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Dharwad", "Mangaluru", "Belagavi", "Kalaburagi", "Tumkur", "Davangere", "Hassan"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Malappuram"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Ratlam", "Dewas", "Khargone"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Kolhapur", "Solapur", "Amravati", "Latur", "Akola", "Yavatmal", "Jalgaon", "Dhule", "Sangli"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"],
    "Meghalaya": ["Shillong", "Tura", "Cherrapunji"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Berhampur", "Sambalpur", "Rourkela", "Balasore", "Puri"],
    "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Moga", "Gurdaspur", "Sangrur", "Ferozepur"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bharatpur", "Sri Ganganagar", "Alwar"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Erode", "Dindigul", "Thanjavur", "Vellore"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Allahabad", "Ghaziabad", "Aligarh", "Bareilly", "Moradabad", "Mathura", "Muzaffarnagar", "Saharanpur"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur"],
    "West Bengal": ["Kolkata", "Howrah", "Asansol", "Siliguri", "Bardhaman", "Malda", "Murshidabad"],
};

const allStates = ["All States & Cities", ...Object.keys(indiaStatesDistricts).sort()];

interface Rate {
    crop: string;
    emoji: string;
    market: string;
    state: string;
    district: string;
    min: number;
    max: number;
    modal: number;
    unit: string;
    trend: "up" | "down" | "stable";
    change: number;
    weeklyHistory: number[];
}

const mandiRates: Rate[] = [
    { crop: "Wheat", emoji: "🌾", market: "Karnal APMC", state: "Haryana", district: "Karnal", min: 2100, max: 2480, modal: 2300, unit: "₹/quintal", trend: "up", change: 4.2, weeklyHistory: [2180, 2200, 2250, 2220, 2280, 2300, 2300] },
    { crop: "Wheat", emoji: "🌾", market: "Ludhiana APMC", state: "Punjab", district: "Ludhiana", min: 2050, max: 2420, modal: 2250, unit: "₹/quintal", trend: "up", change: 3.8, weeklyHistory: [2150, 2170, 2210, 2200, 2230, 2250, 2250] },
    { crop: "Tomato", emoji: "🍅", market: "Pune APMC", state: "Maharashtra", district: "Pune", min: 800, max: 1400, modal: 1100, unit: "₹/quintal", trend: "down", change: -8.1, weeklyHistory: [1320, 1300, 1250, 1200, 1180, 1100, 1100] },
    { crop: "Tomato", emoji: "🍅", market: "Kolar APMC", state: "Karnataka", district: "Bengaluru", min: 900, max: 1600, modal: 1250, unit: "₹/quintal", trend: "down", change: -5.3, weeklyHistory: [1400, 1380, 1330, 1300, 1280, 1250, 1250] },
    { crop: "Onion", emoji: "🧅", market: "Lasalgaon APMC", state: "Maharashtra", district: "Nashik", min: 950, max: 1650, modal: 1350, unit: "₹/quintal", trend: "up", change: 12.4, weeklyHistory: [1050, 1100, 1150, 1200, 1280, 1300, 1350] },
    { crop: "Onion", emoji: "🧅", market: "Alwar APMC", state: "Rajasthan", district: "Alwar", min: 900, max: 1500, modal: 1200, unit: "₹/quintal", trend: "up", change: 9.1, weeklyHistory: [980, 1020, 1080, 1120, 1160, 1200, 1200] },
    { crop: "Cotton", emoji: "🌿", market: "Nagpur APMC", state: "Maharashtra", district: "Nagpur", min: 6200, max: 6800, modal: 6500, unit: "₹/quintal", trend: "stable", change: 0.3, weeklyHistory: [6450, 6480, 6500, 6490, 6510, 6500, 6500] },
    { crop: "Cotton", emoji: "🌿", market: "Surendranagar APMC", state: "Gujarat", district: "Ahmedabad", min: 6100, max: 6700, modal: 6400, unit: "₹/quintal", trend: "up", change: 1.8, weeklyHistory: [6200, 6250, 6300, 6320, 6370, 6400, 6400] },
    { crop: "Soybean", emoji: "🫘", market: "Amravati APMC", state: "Maharashtra", district: "Amravati", min: 3800, max: 4300, modal: 4050, unit: "₹/quintal", trend: "up", change: 3.1, weeklyHistory: [3900, 3930, 3970, 4000, 4020, 4050, 4050] },
    { crop: "Soybean", emoji: "🫘", market: "Indore APMC", state: "Madhya Pradesh", district: "Indore", min: 3750, max: 4200, modal: 3980, unit: "₹/quintal", trend: "up", change: 2.5, weeklyHistory: [3860, 3880, 3910, 3940, 3960, 3980, 3980] },
    { crop: "Potato", emoji: "🥔", market: "Pune APMC", state: "Maharashtra", district: "Pune", min: 1100, max: 1600, modal: 1350, unit: "₹/quintal", trend: "down", change: -5.6, weeklyHistory: [1500, 1480, 1450, 1420, 1400, 1370, 1350] },
    { crop: "Potato", emoji: "🥔", market: "Agra APMC", state: "Uttar Pradesh", district: "Agra", min: 900, max: 1350, modal: 1100, unit: "₹/quintal", trend: "down", change: -7.2, weeklyHistory: [1280, 1250, 1200, 1180, 1140, 1100, 1100] },
    { crop: "Corn (Maize)", emoji: "🌽", market: "Kolhapur APMC", state: "Maharashtra", district: "Kolhapur", min: 1600, max: 1950, modal: 1780, unit: "₹/quintal", trend: "stable", change: 1.1, weeklyHistory: [1740, 1750, 1760, 1755, 1770, 1775, 1780] },
    { crop: "Corn (Maize)", emoji: "🌽", market: "Davangere APMC", state: "Karnataka", district: "Davangere", min: 1550, max: 1900, modal: 1720, unit: "₹/quintal", trend: "stable", change: 0.8, weeklyHistory: [1690, 1700, 1710, 1705, 1715, 1720, 1720] },
    { crop: "Rice (Paddy)", emoji: "🌾", market: "Aurangabad APMC", state: "Maharashtra", district: "Aurangabad", min: 1900, max: 2400, modal: 2150, unit: "₹/quintal", trend: "up", change: 2.8, weeklyHistory: [2060, 2080, 2100, 2110, 2130, 2145, 2150] },
    { crop: "Rice (Paddy)", emoji: "🌾", market: "Thanjavur APMC", state: "Tamil Nadu", district: "Thanjavur", min: 1950, max: 2450, modal: 2200, unit: "₹/quintal", trend: "up", change: 3.5, weeklyHistory: [2100, 2120, 2140, 2160, 2180, 2200, 2200] },
    { crop: "Groundnut", emoji: "🥜", market: "Rajkot APMC", state: "Gujarat", district: "Rajkot", min: 5200, max: 5900, modal: 5550, unit: "₹/quintal", trend: "up", change: 5.2, weeklyHistory: [5200, 5280, 5350, 5400, 5460, 5520, 5550] },
    { crop: "Groundnut", emoji: "🥜", market: "Anantapur APMC", state: "Andhra Pradesh", district: "Anantapur", min: 5100, max: 5800, modal: 5480, unit: "₹/quintal", trend: "up", change: 4.3, weeklyHistory: [5150, 5220, 5300, 5360, 5400, 5450, 5480] },
    { crop: "Sugarcane", emoji: "🎋", market: "Kolhapur SAP", state: "Maharashtra", district: "Kolhapur", min: 320, max: 380, modal: 350, unit: "₹/quintal", trend: "stable", change: 0.0, weeklyHistory: [350, 350, 350, 350, 350, 350, 350] },
    { crop: "Mustard", emoji: "🌻", market: "Sri Ganganagar APMC", state: "Rajasthan", district: "Sri Ganganagar", min: 5100, max: 5700, modal: 5380, unit: "₹/quintal", trend: "down", change: -2.1, weeklyHistory: [5620, 5580, 5530, 5500, 5460, 5400, 5380] },
    { crop: "Banana", emoji: "🍌", market: "Jalgaon APMC", state: "Maharashtra", district: "Jalgaon", min: 1200, max: 1800, modal: 1500, unit: "₹/quintal", trend: "up", change: 6.8, weeklyHistory: [1350, 1380, 1420, 1450, 1470, 1490, 1500] },
    { crop: "Chilli", emoji: "🌶️", market: "Guntur APMC", state: "Andhra Pradesh", district: "Guntur", min: 7000, max: 12000, modal: 9500, unit: "₹/quintal", trend: "up", change: 14.3, weeklyHistory: [7800, 8200, 8600, 8900, 9100, 9300, 9500] },
    { crop: "Chilli", emoji: "🌶️", market: "Khammam APMC", state: "Telangana", district: "Khammam", min: 6800, max: 11500, modal: 9200, unit: "₹/quintal", trend: "up", change: 11.8, weeklyHistory: [7500, 7900, 8300, 8600, 8800, 9000, 9200] },
    { crop: "Turmeric", emoji: "🟡", market: "Erode APMC", state: "Tamil Nadu", district: "Erode", min: 8000, max: 11000, modal: 9500, unit: "₹/quintal", trend: "down", change: -3.7, weeklyHistory: [10200, 10000, 9850, 9750, 9680, 9600, 9500] },
    { crop: "Apple", emoji: "🍎", market: "Shimla APMC", state: "Himachal Pradesh", district: "Shimla", min: 4000, max: 8000, modal: 6000, unit: "₹/quintal", trend: "up", change: 8.5, weeklyHistory: [5200, 5400, 5600, 5700, 5850, 5960, 6000] },
];

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } as const },
};

function MiniChart({ data, trend }: { data: number[]; trend: "up" | "down" | "stable" }) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const w = 80; const h = 32;
    const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
    const color = trend === "up" ? "#10b981" : trend === "down" ? "#f43f5e" : "#94a3b8";
    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
            <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {data.map((v, i) => (
                <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - ((v - min) / range) * h} r="2" fill={color} />
            ))}
        </svg>
    );
}

export default function MandiRatesPage() {
    const { location } = useLocation();
    const { t } = useLanguage();
    const [selectedState, setSelectedState] = useState<string>(
        location.source !== "none" && location.state ? location.state : "All States & Cities"
    );
    const [selectedDistrict, setSelectedDistrict] = useState<string>("All Districts");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Rate | null>(null);
    const [showStateDropdown, setShowStateDropdown] = useState(false);
    const [stateSearch, setStateSearch] = useState("");

    const districts = useMemo(() => {
        if (selectedState === "All States & Cities") return ["All Districts"];
        return ["All Districts", ...(indiaStatesDistricts[selectedState] || [])];
    }, [selectedState]);

    const filtered = useMemo(() => mandiRates.filter((r) => {
        const matchState = selectedState === "All States & Cities" || r.state === selectedState;
        const matchDistrict = selectedDistrict === "All Districts" || r.district === selectedDistrict;
        const matchSearch = r.crop.toLowerCase().includes(search.toLowerCase()) || r.market.toLowerCase().includes(search.toLowerCase());
        return matchState && matchDistrict && matchSearch;
    }), [selectedState, selectedDistrict, search]);

    const filteredStates = allStates.filter(s => s.toLowerCase().includes(stateSearch.toLowerCase()));

    const trendIcon = (trend: string, size = "h-5 w-5") => {
        if (trend === "up") return <TrendingUp className={cn(size, "text-emerald-500")} />;
        if (trend === "down") return <TrendingDown className={cn(size, "text-rose-500")} />;
        return <Minus className={cn(size, "text-slate-400")} />;
    };
    const trendColor = (trend: string) => {
        if (trend === "up") return "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
        if (trend === "down") return "text-rose-600 bg-rose-500/10 border-rose-500/20";
        return "text-slate-500 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700";
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto"
            onClick={() => showStateDropdown && setShowStateDropdown(false)}
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="p-3 bg-amber-500/10 rounded-2xl">
                            <BarChart3 className="h-9 w-9 text-amber-600" />
                        </div>
                        Mandi{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-emerald-400">Rates</span>
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                        {t("mandi.subtitle")}
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Updated: Today, 4:30 PM IST
                </div>
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        id="mandi-search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t("mandi.searchPlaceholder")}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-medium"
                    />
                </div>

                {/* State – custom dropdown with search */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                        id="state-filter"
                        onClick={() => setShowStateDropdown(!showStateDropdown)}
                        className="flex items-center gap-2 pl-4 pr-3 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-bold text-left min-w-[200px]"
                    >
                        <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="flex-1 truncate">{selectedState}</span>
                        <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                    </button>
                    <AnimatePresence>
                        {showStateDropdown && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden"
                            >
                                <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                                    <input
                                        value={stateSearch}
                                        onChange={e => setStateSearch(e.target.value)}
                                        placeholder="Search state..."
                                        className="w-full px-3 py-1.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none font-medium"
                                    />
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {filteredStates.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => { setSelectedState(s); setSelectedDistrict("All Districts"); setShowStateDropdown(false); setStateSearch(""); }}
                                            className={cn("w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-amber-500/5 transition-colors", selectedState === s ? "text-amber-600 font-black bg-amber-500/5" : "text-slate-700 dark:text-slate-300")}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* District */}
                <select
                    id="district-filter"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-bold cursor-pointer"
                >
                    {districts.map(d => <option key={d}>{d}</option>)}
                </select>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Rate Cards */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {filtered.map((rate) => (
                        <motion.button
                            key={rate.crop + rate.market}
                            id={`rate-card-${rate.crop.toLowerCase().replace(/\s/g, "-")}-${rate.district.toLowerCase().replace(/\s/g, "-")}`}
                            variants={itemVariants}
                            whileHover={{ y: -4, scale: 1.02 }}
                            onClick={() => setSelected(rate)}
                            className={cn(
                                "group text-left p-6 rounded-[2rem] border shadow-md transition-all duration-300",
                                selected?.crop === rate.crop && selected?.market === rate.market
                                    ? "bg-amber-500/5 border-amber-500/30 shadow-amber-500/10"
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400/30"
                            )}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{rate.emoji}</span>
                                    <div>
                                        <p className="font-black text-slate-900 dark:text-white">{rate.crop}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{rate.market}</p>
                                        <p className="text-[9px] font-medium text-slate-300 dark:text-slate-600">{rate.state}</p>
                                    </div>
                                </div>
                                <div className={cn("flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border", trendColor(rate.trend))}>
                                    {trendIcon(rate.trend, "h-3.5 w-3.5")}
                                    {rate.change > 0 ? "+" : ""}{rate.change}%
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Modal Price</p>
                                    <div className="flex items-baseline gap-1">
                                        <IndianRupee className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                                        <span className="text-2xl font-black text-slate-900 dark:text-white">{rate.modal.toLocaleString()}</span>
                                        <span className="text-xs text-slate-400 font-medium">/qtl</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium mt-1">Min: ₹{rate.min.toLocaleString()} · Max: ₹{rate.max.toLocaleString()}</p>
                                </div>
                                <MiniChart data={rate.weeklyHistory} trend={rate.trend} />
                            </div>
                        </motion.button>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
                            <BarChart3 className="h-10 w-10 opacity-30" />
                            <p className="font-bold">No rates found for selected filters.</p>
                        </div>
                    )}
                </div>

                {/* Detail Panel */}
                <motion.div variants={itemVariants} className="lg:col-span-1">
                    <AnimatePresence mode="wait">
                        {selected ? (
                            <motion.div
                                key={selected.crop + selected.market}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden sticky top-6"
                            >
                                <div className="p-7 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-amber-500/5 to-transparent">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-4xl">{selected.emoji}</span>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 dark:text-white">{selected.crop}</h3>
                                            <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mt-1">
                                                <MapPin className="h-3 w-3" />
                                                {selected.market}
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-0.5">{selected.district}, {selected.state}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { label: "Min", value: selected.min, color: "text-rose-500" },
                                            { label: "Modal", value: selected.modal, color: "text-emerald-600 font-black" },
                                            { label: "Max", value: selected.max, color: "text-blue-500" },
                                        ].map((p) => (
                                            <div key={p.label} className="text-center p-3 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{p.label}</p>
                                                <p className={cn("text-lg font-black mt-1", p.color)}>₹{p.value.toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-7">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">7-Day Price Trend</h4>
                                    <div className="space-y-2">
                                        {selected.weeklyHistory.map((price, i) => {
                                            const maxH = Math.max(...selected.weeklyHistory);
                                            const barW = Math.round((price / maxH) * 100);
                                            const isToday = i === selected.weeklyHistory.length - 1;
                                            return (
                                                <div key={i} className="flex items-center gap-3">
                                                    <span className={cn("text-[10px] font-black uppercase tracking-widest w-8 shrink-0", isToday ? "text-amber-600" : "text-slate-400")}>{dayLabels[i]}</span>
                                                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${barW}%` }}
                                                            transition={{ duration: 0.8, delay: i * 0.06 }}
                                                            className={cn("h-full rounded-full", isToday ? "bg-gradient-to-r from-amber-500 to-amber-400" : "bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-500")}
                                                        />
                                                    </div>
                                                    <span className={cn("text-[10px] font-black text-right w-14 shrink-0", isToday ? "text-amber-600" : "text-slate-500")}>₹{price.toLocaleString()}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center gap-4 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800"
                            >
                                <div className="p-6 bg-amber-500/10 rounded-3xl">
                                    <BarChart3 className="h-10 w-10 text-amber-500" />
                                </div>
                                <div>
                                    <p className="font-black text-slate-700 dark:text-slate-300">Select a commodity</p>
                                    <p className="text-sm text-slate-400 font-medium mt-1 max-w-[180px]">Click any rate card to see detailed price trends.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}
