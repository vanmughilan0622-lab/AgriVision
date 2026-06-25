"use client";

import { CloudRain, Sun, Wind, Droplets, MapPin, Thermometer, Activity, Info, TrendingUp, Eye, Gauge, Leaf, CloudFog, Sunset, CloudLightning, CloudSun } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getWeather } from "@/app/actions/weather-actions";
import { cn, getWeatherCondition } from "@/lib/utils";
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

    const [vitals, setVitals] = useState([
        { label: "Wind Speed", value: "--", sub: "--", icon: Wind, color: "text-blue-400", bg: "bg-blue-500/10" },
        { label: "Humidity", value: "--", sub: "--", icon: Droplets, color: "text-cyan-400", bg: "bg-cyan-500/10" },
        { label: "Rain Chance", value: "--", sub: "--", icon: CloudRain, color: "text-indigo-400", bg: "bg-indigo-500/10" },
        { label: "UV Index", value: "--", sub: "--", icon: Sun, color: "text-amber-400", bg: "bg-amber-500/10" },
        { label: "Visibility", value: "--", sub: "--", icon: Eye, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        { label: "Air Pressure", value: "--", sub: "--", icon: Gauge, color: "text-purple-400", bg: "bg-purple-500/10" },
        { label: "Cloud Cover", value: "--", sub: "--", icon: CloudFog, color: "text-orange-400", bg: "bg-orange-500/10" },
        { label: "Dew Point", value: "--", sub: "--", icon: Sunset, color: "text-pink-400", bg: "bg-pink-500/10" },
    ]);

    const soilData = [
        { label: "pH Level", value: "6.5", status: "Optimal", color: "emerald" },
        { label: "Nitrogen (N)", value: "Low", status: "Recharge Needed", color: "rose" },
        { label: "Phosphorus (P)", value: "High", status: "Optimal", color: "emerald" },
        { label: "Potassium (K)", value: "Medium", status: "Stable", color: "amber" },
        { label: "Organic Matter", value: "2.4%", status: "Below Ideal", color: "amber" },
        { label: "Soil Temp", value: "19°C", status: "Good Range", color: "emerald" },
    ];

    const [forecast, setForecast] = useState([
        { day: "Mon", icon: Sun, high: "--", low: "--", rain: "--" },
        { day: "Tue", icon: Sun, high: "--", low: "--", rain: "--" },
        { day: "Wed", icon: Sun, high: "--", low: "--", rain: "--" },
        { day: "Thu", icon: Sun, high: "--", low: "--", rain: "--" },
        { day: "Fri", icon: Sun, high: "--", low: "--", rain: "--" },
    ]);

    const [currentTemp, setCurrentTemp] = useState("--");
    const [currentCond, setCurrentCond] = useState({ label: "Loading...", icon: CloudSun, color: "text-amber-400" });
    const [todayHigh, setTodayHigh] = useState("--");
    const [todayLow, setTodayLow] = useState("--");
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        // Default fallback: Erode, Tamil Nadu
        const DEFAULT_LAT = 11.341;
        const DEFAULT_LON = 77.7172;

        async function doFetch(lat: number, lon: number) {
            setIsLoading(true);
            setFetchError(null);
            try {
                const res = await getWeather(lat, lon);
                if (res.success) {
                    const c = res.data.current;
                    const d = res.data.daily;
                    const cond = getWeatherCondition(c.weather_code);

                    setCurrentTemp(Math.round(c.temperature_2m).toString());
                    let IconComp = CloudSun;
                    if (cond.iconType === "Sun") IconComp = Sun;
                    if (cond.iconType === "CloudFog") IconComp = CloudFog;
                    if (cond.iconType === "CloudRain") IconComp = CloudRain;
                    if (cond.iconType === "CloudLightning") IconComp = CloudLightning;

                    setCurrentCond({ label: cond.label, icon: IconComp, color: cond.color });
                    setTodayHigh(Math.round(d.temperature_2m_max[0]).toString());
                    setTodayLow(Math.round(d.temperature_2m_min[0]).toString());

                    setVitals([
                        { label: "Wind Speed", value: `${Math.round(c.wind_speed_10m)} km/h`, sub: `${c.wind_direction_10m}° Dir`, icon: Wind, color: "text-blue-400", bg: "bg-blue-500/10" },
                        { label: "Humidity", value: `${Math.round(c.relative_humidity_2m)}%`, sub: "Live reading", icon: Droplets, color: "text-cyan-400", bg: "bg-cyan-500/10" },
                        { label: "Rain Chance", value: `${d.precipitation_probability_max[0]}%`, sub: "Today max", icon: CloudRain, color: "text-indigo-400", bg: "bg-indigo-500/10" },
                        { label: "UV Index", value: `${Math.round(d.uv_index_max[0])}`, sub: "Max Today", icon: Sun, color: "text-amber-400", bg: "bg-amber-500/10" },
                        { label: "Visibility", value: `${(c.visibility / 1000).toFixed(1)} km`, sub: "Current", icon: Eye, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                        { label: "Air Pressure", value: `${Math.round(c.pressure_msl)} hPa`, sub: "Sea level", icon: Gauge, color: "text-purple-400", bg: "bg-purple-500/10" },
                        { label: "Cloud Cover", value: `${c.cloud_cover}%`, sub: "Sky coverage", icon: CloudFog, color: "text-orange-400", bg: "bg-orange-500/10" },
                        { label: "Dew Point", value: `${Math.round(c.dew_point_2m)}°C`, sub: "Current", icon: Sunset, color: "text-pink-400", bg: "bg-pink-500/10" },
                    ]);

                    const forecastArr = [];
                    for (let i = 0; i < 5; i++) {
                        const dateStr = d.time[i];
                        const date = new Date(dateStr);
                        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                        const fCond = getWeatherCondition(d.weather_code[i]);
                        let fIcon = CloudSun;
                        if (fCond.iconType === "Sun") fIcon = Sun;
                        if (fCond.iconType === "CloudFog") fIcon = CloudFog;
                        if (fCond.iconType === "CloudRain") fIcon = CloudRain;
                        if (fCond.iconType === "CloudLightning") fIcon = CloudLightning;
                        forecastArr.push({
                            day: i === 0 ? "Today" : dayName,
                            icon: fIcon,
                            high: Math.round(d.temperature_2m_max[i]).toString(),
                            low: Math.round(d.temperature_2m_min[i]).toString(),
                            rain: d.precipitation_probability_max[i].toString()
                        });
                    }
                    setForecast(forecastArr);
                } else {
                    setFetchError("Weather data unavailable. Check connection.");
                    setCurrentCond({ label: "Unavailable", icon: CloudSun, color: "text-slate-400" });
                }
            } catch {
                setFetchError("Failed to load weather.");
                setCurrentCond({ label: "Error", icon: CloudSun, color: "text-slate-400" });
            } finally {
                setIsLoading(false);
            }
        }

        if (location.source !== "none" && location.lat && location.lon) {
            // Location already available — fetch immediately
            doFetch(location.lat, location.lon);
        } else {
            // Wait up to 5s for geolocation, then fall back to default
            const timer = setTimeout(() => {
                doFetch(DEFAULT_LAT, DEFAULT_LON);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [location]);

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
                                <currentCond.icon className={cn("h-14 w-14 animate-pulse", currentCond.color)} />
                                <div className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full" />
                            </div>
                        </div>

                        <div className="flex items-end gap-4 text-white mb-5">
                            {isLoading ? (
                                <div className="flex items-end gap-4 animate-pulse">
                                    <div className="h-16 w-24 bg-white/10 rounded-2xl" />
                                    <div className="mb-2 space-y-2">
                                        <div className="h-5 w-24 bg-white/10 rounded-lg" />
                                        <div className="h-3 w-32 bg-white/5 rounded-lg" />
                                    </div>
                                </div>
                            ) : fetchError ? (
                                <div className="text-rose-400 text-sm font-bold py-2">{fetchError}</div>
                            ) : (
                                <>
                                    <span className="text-7xl font-black tracking-tighter leading-none">{currentTemp}°</span>
                                    <div className="mb-2 space-y-0.5">
                                        <p className={cn("text-2xl font-black", currentCond.color)}>{currentCond.label}</p>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">High: {todayHigh}° • Low: {todayLow}°</p>
                                    </div>
                                </>
                            )}
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
