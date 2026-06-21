"use client";

import { CloudRain, Sun, Wind, Droplets, MapPin, Thermometer, Activity, Info, TrendingUp, Eye, Gauge, Leaf, CloudFog, Sunset } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocation } from "@/lib/location-context";
import { useLanguage } from "@/lib/language-context";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const itemVariants: any = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 } as const
    }
};

export default function EnvironmentPage() {
    const { location } = useLocation();
    const { t } = useLanguage();
    const locationLabel = location.source !== "none" ? location.label : "Farm Location";

    const vitals = [
        { label: "Wind Speed", value: "12 km/h", sub: "NE Direction", icon: Wind, color: "text-blue-400", bg: "bg-blue-500/10" },
        { label: "Humidity", value: "65%", sub: "Comfortable", icon: Droplets, color: "text-cyan-400", bg: "bg-cyan-500/10" },
        { label: "Rain Chance", value: "10%", sub: "Mostly Dry", icon: CloudRain, color: "text-indigo-400", bg: "bg-indigo-500/10" },
        { label: "UV Index", value: "6 — High", sub: "Use Protection", icon: Sun, color: "text-amber-400", bg: "bg-amber-500/10" },
        { label: "Visibility", value: "9.5 km", sub: "Clear Sky", icon: Eye, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        { label: "Air Pressure", value: "1013 hPa", sub: "Stable", icon: Gauge, color: "text-purple-400", bg: "bg-purple-500/10" },
        { label: "AQI", value: "72 — Moderate", sub: "Acceptable", icon: CloudFog, color: "text-orange-400", bg: "bg-orange-500/10" },
        { label: "Dew Point", value: "14°C", sub: "Low Frost Risk", icon: Sunset, color: "text-pink-400", bg: "bg-pink-500/10" },
    ];

    const soilData = [
        { label: "pH Level", value: "6.5", status: "Optimal", color: "emerald" },
        { label: "Nitrogen (N)", value: "Low", status: "Recharge Needed", color: "rose" },
        { label: "Phosphorus (P)", value: "High", status: "Optimal", color: "emerald" },
        { label: "Potassium (K)", value: "Medium", status: "Stable", color: "amber" },
        { label: "Organic Matter", value: "2.4%", status: "Below Ideal", color: "amber" },
        { label: "Soil Temp", value: "19°C", status: "Good Range", color: "emerald" },
    ];

    const forecast = [
        { day: "Mon", icon: Sun, high: 26, low: 18, rain: 5 },
        { day: "Tue", icon: CloudRain, high: 22, low: 16, rain: 70 },
        { day: "Wed", icon: CloudRain, high: 20, low: 15, rain: 60 },
        { day: "Thu", icon: Sun, high: 25, low: 17, rain: 10 },
        { day: "Fri", icon: Sun, high: 27, low: 19, rain: 5 },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-7 space-y-6 max-w-7xl mx-auto"
        >
            <motion.div variants={itemVariants} className="space-y-1">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                    {t("env.title")}
                </h1>
                <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
                    Precision environmental monitoring for {locationLabel}.
                </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
                {/* Compact Weather Card */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 relative bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-800"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />

                    <div className="p-7 relative z-10">
                        <div className="flex justify-between items-start mb-5">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 w-fit">
                                    <MapPin className="h-4 w-4 text-emerald-500" />
                                    <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">{locationLabel}</span>
                                </div>
                                <h2 className="text-lg font-black text-white">{t("env.todayConditions")}</h2>
                            </div>
                            <div className="relative">
                                <Sun className="h-14 w-14 text-amber-400 animate-pulse" />
                                <div className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full" />
                            </div>
                        </div>

                        <div className="flex items-end gap-4 text-white mb-5">
                            <span className="text-7xl font-black tracking-tighter leading-none">24°</span>
                            <div className="mb-2 space-y-0.5">
                                <p className="text-2xl font-black text-emerald-400">Partly Radiant</p>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">High: 26° • Low: 18°</p>
                            </div>
                        </div>

                        {/* 5-day forecast row */}
                        <div className="grid grid-cols-5 gap-2 pt-4 border-t border-white/5">
                            {forecast.map((f, i) => (
                                <div key={i} className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/5 transition-colors">
                                    <span className="text-[10px] font-black text-slate-500 uppercase">{f.day}</span>
                                    <f.icon className={cn("h-5 w-5", i === 1 || i === 2 ? "text-blue-400" : "text-amber-400")} />
                                    <span className="text-sm font-black text-white">{f.high}°</span>
                                    <span className="text-xs font-bold text-slate-600">{f.low}°</span>
                                    <span className="text-[9px] font-black text-blue-400">{f.rain}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Soil Conditions */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl"
                >
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-base font-black text-slate-900 dark:text-white">Soil Biometrics</h3>
                        <Activity className="h-5 w-5 text-emerald-500" />
                    </div>

                    <div className="space-y-3">
                        {soilData.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center py-2.5 border-b border-slate-50 dark:border-slate-800 last:border-0">
                                <div>
                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">{item.label}</span>
                                    <p className="text-sm font-black text-slate-900 dark:text-white">{item.value}</p>
                                </div>
                                <div className={cn(
                                    "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg",
                                    item.color === "emerald" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                                        item.color === "rose" ? "bg-rose-500/10 text-rose-600" :
                                            "bg-amber-500/10 text-amber-600"
                                )}>
                                    {item.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* 8 Environment Vitals Grid */}
            <motion.div variants={itemVariants}>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Live Environment Vitals</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {vitals.map((v, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -4 }}
                            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-3 shadow-sm"
                        >
                            <div className={cn("p-2.5 rounded-xl", v.bg)}>
                                <v.icon className={cn("h-5 w-5", v.color)} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{v.label}</p>
                                <p className="text-sm font-black text-slate-900 dark:text-white">{v.value}</p>
                                <p className="text-[9px] text-slate-400">{v.sub}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Recommendation Banner */}
            <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-emerald-600 to-emerald-400 p-6 rounded-[2rem] shadow-2xl shadow-emerald-500/20 relative overflow-hidden"
            >
                <div className="absolute -right-4 -top-4 opacity-20 rotate-12">
                    <TrendingUp className="h-28 w-28 text-white" />
                </div>
                <div className="relative z-10 flex items-start gap-4">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl shrink-0">
                        <Info className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-black text-white uppercase tracking-widest text-xs mb-1">Strategic Recommendation</h4>
                        <p className="text-emerald-50 font-bold text-sm leading-relaxed">
                            Nitrogen levels are critically low in your field. Apply urea fertilizer (46% N) at 50 kg/acre before Tuesday's predicted rain for best absorption.
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
