"use client";

import { useState, useEffect, useRef } from "react";
import {
  CloudSun,
  Droplets,
  Thermometer,
  Wind,
  AlertTriangle,
  CheckCircle2,
  Sprout,
  ArrowUpRight,
  Sparkles,
  Zap,
  MapPin,
  LocateFixed,
  X,
  Check,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocation } from "@/lib/location-context";
import type { FarmerLocation } from "@/lib/location-context";
import { useLanguage } from "@/lib/language-context";

const indiaStatesDistricts: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Kadapa", "Anantapur"],
  "Assam": ["Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Nagaon", "Tezpur"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Arrah", "Begusarai"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Anand"],
  "Haryana": ["Gurugram", "Faridabad", "Ambala", "Hisar", "Karnal", "Rohtak", "Panipat", "Sirsa"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamsala", "Kullu", "Solan", "Mandi"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Dharwad", "Mangaluru", "Belagavi", "Kalaburagi", "Tumkur", "Davangere", "Hassan"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Ratlam", "Dewas"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Kolhapur", "Solapur", "Amravati", "Latur", "Akola", "Yavatmal", "Jalgaon", "Dhule"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Berhampur", "Sambalpur", "Rourkela", "Balasore", "Puri"],
  "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Moga", "Gurdaspur", "Sangrur"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bharatpur", "Sri Ganganagar", "Alwar"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Erode", "Dindigul", "Thanjavur", "Vellore"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Allahabad", "Ghaziabad", "Aligarh", "Bareilly", "Moradabad", "Mathura", "Muzaffarnagar"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur"],
  "West Bengal": ["Kolkata", "Howrah", "Asansol", "Siliguri", "Bardhaman", "Malda", "Murshidabad"],
};

// Mock Data
const weatherData = [
  { label: "Temperature", value: "24°C", icon: Thermometer, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Humidity", value: "65%", icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Wind Speed", value: "12 km/h", icon: Wind, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Condition", value: "Partly Cloudy", icon: CloudSun, color: "text-sky-500", bg: "bg-sky-500/10" },
];

const cropStatus = [
  {
    name: "Wheat",
    status: "Good",
    health: 92,
    moisture: "Adequate",
    period: "Maturity Stage",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Corn",
    status: "Attention",
    health: 78,
    moisture: "Low",
    period: "Vegetative Stage",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Tomato",
    status: "Risk",
    health: 65,
    moisture: "High",
    period: "Flowering Stage",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=200&h=200"
  },
];

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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Good: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    Attention: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Risk: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  };

  return (
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border", styles[status] || "bg-slate-100")}>
      {status}
    </span>
  );
}

export default function Dashboard() {
  const { location, setLocation } = useLocation();
  const { t } = useLanguage();
  const [showLocPicker, setShowLocPicker] = useState(false);
  const [locState, setLocState] = useState("");
  const [locDistrict, setLocDistrict] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const districts = locState ? (indiaStatesDistricts[locState] || []) : [];

  const handleGps = () => {
    setGpsLoading(true);
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError("Geolocation not supported.");
      setGpsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const loc: FarmerLocation = {
          state: t("location.autoDetected"),
          district: "",
          city: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          label: `${t("location.gpsPrefix")}${latitude.toFixed(3)}°N, ${longitude.toFixed(3)}°E`,
          lat: latitude,
          lon: longitude,
          source: "gps",
        };
        setLocation(loc);
        setGpsLoading(false);
        setShowLocPicker(false);
      },
      (err) => {
        setGpsError("Location access denied. Use manual entry.");
        setGpsLoading(false);
      }
    );
  };

  const handleManualSave = () => {
    if (!locState) return;
    const loc: FarmerLocation = {
      state: locState,
      district: locDistrict,
      city: locDistrict || locState,
      label: locDistrict ? `${locDistrict}, ${locState}` : locState,
      source: "manual",
    };
    setLocation(loc);
    setShowLocPicker(false);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 md:p-10 space-y-10 max-w-7xl mx-auto"
      onClick={() => showLocPicker && setShowLocPicker(false)}
    >
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              <Zap className="h-10 w-10 text-emerald-500 fill-emerald-500" />
              {t("dash.title")}
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              {t("dash.subtitle")}
            </p>
          </div>

          {/* Location Widget */}
          <div className="relative shrink-0" ref={pickerRef} onClick={e => e.stopPropagation()}>
            <motion.button
              id="location-widget"
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowLocPicker(!showLocPicker)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-2xl border font-bold text-sm transition-all shadow-sm",
                location.source !== "none"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              )}
            >
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="max-w-[200px] truncate">{location.source !== "none" ? location.label : t("dash.setLocation")}</span>
              <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
            </motion.button>

            <AnimatePresence>
              {showLocPicker && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] shadow-2xl z-50 p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-black text-slate-900 dark:text-white text-sm">{t("dash.setLocation")}</p>
                    <button onClick={() => setShowLocPicker(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <X className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>

                  <button
                    id="gps-detect"
                    onClick={handleGps}
                    disabled={gpsLoading}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all disabled:opacity-60"
                  >
                    <LocateFixed className="h-4 w-4" />
                    {gpsLoading ? t("dash.detecting") : t("dash.gps")}
                  </button>

                  {gpsError && <p className="text-xs text-rose-600 font-bold text-center">{gpsError}</p>}

                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("dash.orManual")}</span>
                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
                  </div>

                  <div className="space-y-3">
                    <select
                      id="loc-state"
                      value={locState}
                      onChange={e => { setLocState(e.target.value); setLocDistrict(""); }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="">{t("dash.selectState")}</option>
                      {Object.keys(indiaStatesDistricts).sort().map(s => <option key={s}>{s}</option>)}
                    </select>

                    <select
                      id="loc-district"
                      value={locDistrict}
                      onChange={e => setLocDistrict(e.target.value)}
                      disabled={!locState}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50"
                    >
                      <option value="">{t("dash.selectDistrict")}</option>
                      {districts.map(d => <option key={d}>{d}</option>)}
                    </select>

                    <button
                      id="save-location"
                      onClick={handleManualSave}
                      disabled={!locState}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-all disabled:opacity-40"
                    >
                      <Check className="h-4 w-4" />
                      {t("dash.saveLocation")}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Weather Section - Premium Tiles */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {weatherData.map((item, idx) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)] transition-all duration-500"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{item.label}</span>
              <div className={cn("p-2.5 rounded-2xl transition-colors duration-500 group-hover:bg-opacity-20", item.bg)}>
                <item.icon className={cn("h-5 w-5", item.color)} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <div className="text-3xl font-black text-slate-900 dark:text-white">{item.value}</div>
              <ArrowUpRight className="h-4 w-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Insights Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <motion.div variants={itemVariants} className="col-span-full lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Active Cultivations</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Real-time biometrics from the field.</p>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-2xl">
              <Sprout className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="p-8 space-y-6">
            {cropStatus.map((crop) => (
              <motion.div
                key={crop.name}
                whileHover={{ x: 10 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-slate-50 dark:bg-slate-950/50 rounded-3xl border border-transparent hover:border-emerald-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 rounded-[1.5rem] overflow-hidden bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-800">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://source.unsplash.com/featured/?${crop.name.toLowerCase()}`;
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900 dark:text-white">{crop.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-tighter">{crop.period}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900 dark:text-white">{crop.health}% Health</p>
                    <div className="w-28 h-2 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${crop.health}%` }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                        className={cn(
                          "h-full rounded-full",
                          crop.health > 80 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' :
                            crop.health > 60 ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                              'bg-gradient-to-r from-rose-600 to-rose-400'
                        )}
                      />
                    </div>
                  </div>
                  <StatusBadge status={crop.status} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Intelligence Alerts */}
        <motion.div variants={itemVariants} className="col-span-full lg:col-span-3 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Critical Alerts</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Dynamic response requirements.</p>
            </div>
            <div className="p-3 bg-rose-500/10 rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-rose-500" />
            </div>
          </div>
          <div className="p-8 space-y-5">
            {[
              { type: "Danger", title: "Early Blight Detected", desc: "Tomato sector 4. High contagion risk.", icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-500/10", border: "border-rose-200/50" },
              { type: "Warning", title: "Irrigation Needed", desc: "Corn field moisture < 30%. Potential stress.", icon: Droplets, color: "text-amber-600", bg: "bg-amber-500/10", border: "border-amber-200/50" },
              { type: "Success", title: "Harvest Prime", desc: "Wheat sector 2 reached peak maturity.", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-500/10", border: "border-emerald-200/50" }
            ].map((alert, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className={cn("flex gap-5 items-start p-5 rounded-[1.8rem] border shadow-sm", alert.bg, alert.border)}
              >
                <div className={cn("p-3 rounded-2xl bg-white dark:bg-slate-900/50 shadow-sm", alert.color)}>
                  <alert.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className={cn("font-black text-sm", alert.color)}>{alert.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium leading-relaxed">{alert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Professional Footer Stat */}
      <motion.div
        variants={itemVariants}
        className="p-8 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-emerald-500/20"
      >
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-md">
            <Sparkles className="h-8 w-8 text-white fill-white" />
          </div>
          <div>
            <h4 className="text-2xl font-black">AI Productivity Score: +84%</h4>
            <p className="text-emerald-50 font-medium">Your farm is performing above the regional average.</p>
          </div>
        </div>
        <button className="mt-6 md:mt-0 px-8 py-4 bg-white text-emerald-600 rounded-[1.5rem] font-black hover:bg-emerald-50 transition-colors shadow-lg shadow-black/5">
          Download Report
        </button>
      </motion.div>
    </motion.div>
  );
}
