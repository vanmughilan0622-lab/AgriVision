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
  ChevronDown,
  Filter,
  QrCode,
  CloudRain,
  Download,
  Map
} from "lucide-react";
import { FarmHeatmap } from "@/components/ui/farm-heatmap";
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
    sector: "Sector 2",
    status: "Good",
    health: 92,
    moisture: "Adequate",
    growthStage: "Maturity Stage",
    marketPrice: "₹2,275/qtl",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Corn",
    sector: "Sector 1",
    status: "Attention",
    health: 78,
    moisture: "Low",
    growthStage: "Vegetative Stage",
    marketPrice: "₹1,962/qtl",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Tomato",
    sector: "Sector 4",
    status: "Critical",
    health: 15,
    moisture: "High",
    growthStage: "Flowering Stage",
    marketPrice: "₹3,500/qtl",
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

const itemVariants: any = {
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
    Risk: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    Critical: "bg-rose-500/10 text-rose-600 border-rose-500/20 animate-pulse",
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
  const [filterMode, setFilterMode] = useState<string>("All Sectors");
  const [showFilterPicker, setShowFilterPicker] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [showIrrigationModal, setShowIrrigationModal] = useState(false);
  const [irrigationStatus, setIrrigationStatus] = useState<"idle" | "loading" | "success">("idle");
  const [showWeatherOverrideModal, setShowWeatherOverrideModal] = useState(false);
  const [showGatePassModal, setShowGatePassModal] = useState(false);
  const [gatePassCrop, setGatePassCrop] = useState<any>(null);

  const districts = locState ? (indiaStatesDistricts[locState] || []) : [];

  const sectors = Array.from(new Set(cropStatus.map(c => c.sector)));
  const filterOptions = ["All Sectors", "Critical Status", "Attention Status", ...sectors];

  const filteredCrops = cropStatus.filter(crop => {
    if (filterMode === "All Sectors") return true;
    if (filterMode === "Critical Status") return crop.status === "Critical";
    if (filterMode === "Attention Status") return crop.status === "Attention";
    return crop.sector === filterMode;
  });

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
      onClick={() => { if (showLocPicker) setShowLocPicker(false); if (showFilterPicker) setShowFilterPicker(false); }}
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
          <div className="flex items-center gap-3 shrink-0">
            {/* Filter Widget */}
            <div className="relative shrink-0" ref={filterRef} onClick={e => e.stopPropagation()}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => { setShowFilterPicker(!showFilterPicker); setShowLocPicker(false); }}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 rounded-2xl border font-bold text-sm transition-all shadow-sm",
                  filterMode !== "All Sectors"
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500/30"
                )}
              >
                <Filter className="h-4 w-4 shrink-0" />
                <span className="max-w-[150px] truncate">{filterMode}</span>
                <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
              </motion.button>
              <AnimatePresence>
                {showFilterPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] shadow-2xl z-50 p-3 space-y-1"
                  >
                    <div className="px-3 py-2 flex items-center justify-between mb-2">
                      <p className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-wider">Filter By</p>
                    </div>
                    {filterOptions.map(opt => (
                      <button
                        key={opt}
                        onClick={() => { setFilterMode(opt); setShowFilterPicker(false); }}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors",
                          filterMode === opt 
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" 
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative shrink-0" ref={pickerRef} onClick={e => e.stopPropagation()}>
            <motion.button
              id="location-widget"
              whileHover={{ scale: 1.02 }}
              onClick={() => { setShowLocPicker(!showLocPicker); setShowFilterPicker(false); }}
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
            <div className="mt-4 flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  {location.source !== "none" ? item.value : "--"}
                </div>
                {location.source !== "none" && (
                  <ArrowUpRight className="h-4 w-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                )}
              </div>
              {location.source === "none" && (
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Awaiting Location</p>
              )}
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
            {filteredCrops.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                  {(filterMode === "Critical Status" || filterMode === "Attention Status") 
                    ? "All clear!" 
                    : "No matches found"}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-sm">
                  {(filterMode === "Critical Status" || filterMode === "Attention Status") 
                    ? `No cultivations currently have a ${filterMode.split(' ')[0].toLowerCase()} status. Great job!` 
                    : "Try selecting a different sector or filter mode to see active data."}
                </p>
              </div>
            ) : filteredCrops.map((crop) => (
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
                    <p className="text-lg font-black text-slate-900 dark:text-white">
                      {crop.name} <span className="text-sm text-slate-500 font-medium">({crop.sector})</span>
                    </p>
                    <div className="flex gap-3 mt-1">
                      <p className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-tighter">Stage: {crop.growthStage}</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-tighter">Market: {crop.marketPrice}</p>
                    </div>
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

        {/* Spatial & Intelligence Column */}
        <div className="col-span-full lg:col-span-3 space-y-8">
          <motion.div variants={itemVariants}>
            <FarmHeatmap cropStatus={cropStatus} activeFilter={filterMode} onSectorClick={setFilterMode} />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
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
              { action: undefined, urgency: 1, urgencyLabel: "Critical Priority", type: "Danger", title: "Early Blight Detected", desc: "Tomato sector 4. High contagion risk. Isolate immediately.", icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-500/10", border: "border-rose-200/50" },
              { action: "Activate Pump", urgency: 2, urgencyLabel: "Moderate Priority", type: "Warning", title: "Irrigation Needed", desc: "Corn field moisture < 30%. Reservoir at 80% capacity. Local water rate: ₹15/kL.", icon: Droplets, color: "text-amber-600", bg: "bg-amber-500/10", border: "border-amber-200/50" },
              { action: "Generate Gate Pass", urgency: 3, urgencyLabel: "Low Priority", type: "Success", title: "Harvest Prime", desc: "Wheat sector 2 reached peak maturity. Market rates favorable.", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-500/10", border: "border-emerald-200/50" }
            ].map((alert, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className={cn("flex gap-5 items-start p-5 rounded-[1.8rem] border shadow-sm", alert.bg, alert.border)}
              >
                <div className={cn("p-3 rounded-2xl bg-white dark:bg-slate-900/50 shadow-sm", alert.color)}>
                  <alert.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={cn("font-black text-sm", alert.color)}>{alert.title}</h4>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider", alert.bg, alert.color)}>
                      {alert.urgencyLabel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium leading-relaxed">{alert.desc}</p>
                  {alert.action && (
                    <button 
                      onClick={() => {
                        if (alert.action === "Activate Pump") {
                          setShowWeatherOverrideModal(true);
                        } else if (alert.action === "Generate Gate Pass") {
                          const crop = cropStatus.find(c => c.name === "Wheat");
                          setGatePassCrop(crop);
                          setShowGatePassModal(true);
                        }
                      }}
                      className="mt-4 px-5 py-2.5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-xs font-black hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-sm flex items-center gap-2 uppercase tracking-wider"
                    >
                      {alert.action === "Activate Pump" ? <Zap className="h-3 w-3" /> : <QrCode className="h-3 w-3" />}
                      {alert.action}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          </motion.div>
        </div>
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
            <h4 className="text-2xl font-black">AI Yield & Resource Score: +84%</h4>
            <p className="text-emerald-50 font-medium">Based on historical yield comparisons and active water conservation.</p>
          </div>
        </div>
        <button className="mt-6 md:mt-0 px-8 py-4 bg-white text-emerald-600 rounded-[1.5rem] font-black hover:bg-emerald-50 transition-colors shadow-lg shadow-black/5">
          Download Report
        </button>
      </motion.div>

      {/* Irrigation Confirmation Modal */}
      <AnimatePresence>
        {showIrrigationModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowIrrigationModal(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-amber-500/10 rounded-3xl flex items-center justify-center mb-6">
                  <AlertTriangle className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Confirm Action</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                  You are about to activate the physical irrigation pumps for <strong className="text-slate-700 dark:text-slate-300">Corn Field (Sector 1)</strong>. This will consume approximately 1500L of reservoir capacity. Proceed?
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowIrrigationModal(false)}
                    className="flex-1 px-6 py-4 rounded-2xl font-black text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={irrigationStatus !== "idle"}
                    onClick={() => {
                      setIrrigationStatus("loading");
                      setTimeout(() => {
                        setIrrigationStatus("success");
                        setTimeout(() => {
                          setShowIrrigationModal(false);
                          setIrrigationStatus("idle");
                        }, 2000);
                      }, 6000); // Simulating hardware relay latency
                    }}
                    className={cn(
                      "flex-1 px-6 py-4 rounded-2xl font-black text-white transition-all flex items-center justify-center gap-2",
                      irrigationStatus === "idle" ? "bg-amber-600 hover:bg-amber-700 shadow-md shadow-amber-500/20 cursor-pointer" :
                      irrigationStatus === "loading" ? "bg-slate-700 cursor-wait opacity-90" : "bg-emerald-500 shadow-md shadow-emerald-500/20"
                    )}
                  >
                    {irrigationStatus === "loading" && <Zap className="h-4 w-4 animate-pulse text-amber-400" />}
                    {irrigationStatus === "idle" ? "Activate Pump" : irrigationStatus === "loading" ? "Syncing with Valve..." : "Command Acknowledged!"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Weather Override Modal */}
      <AnimatePresence>
        {showWeatherOverrideModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowWeatherOverrideModal(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] border border-sky-200 dark:border-sky-800 shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-sky-500/10 rounded-3xl flex items-center justify-center mb-6">
                  <CloudRain className="h-8 w-8 text-sky-500" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Predictive Weather Alert</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
                  Heavy rain is forecast with <strong className="text-slate-700 dark:text-slate-300">&gt;80% probability in 4 hours</strong>. Activating pumps now may over-saturate Sector 1 and waste approximately <strong className="text-slate-700 dark:text-slate-300">₹450</strong> in utility costs.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => { setShowWeatherOverrideModal(false); setShowIrrigationModal(true); }}
                    className="flex-1 px-4 py-4 rounded-2xl font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors text-sm"
                  >
                    Override & Activate
                  </button>
                  <button 
                    onClick={() => setShowWeatherOverrideModal(false)}
                    className="flex-1 px-4 py-4 rounded-2xl font-black text-white bg-sky-500 hover:bg-sky-600 transition-colors text-sm"
                  >
                    Delay Irrigation
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gate Pass Modal */}
      <AnimatePresence>
        {showGatePassModal && gatePassCrop && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowGatePassModal(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">e-NAM Gate Pass</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Lot ID: #WHT-0824-X</p>
                  </div>
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] p-5 mb-6 space-y-4 border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Commodity</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">{gatePassCrop.name} ({gatePassCrop.sector})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Est. Yield</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">42 Quintals</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Market Rate</span>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{gatePassCrop.marketPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Est. Value</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">₹95,550</span>
                  </div>
                </div>

                <div className="flex justify-center mb-8">
                  {/* Mock SVG QR Code */}
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor" className="text-slate-900">
                      <rect width="100" height="100" fill="white" />
                      <path d="M10,10 h20 v20 h-20 z M15,15 h10 v10 h-10 z M70,10 h20 v20 h-20 z M75,15 h10 v10 h-10 z M10,70 h20 v20 h-20 z M15,75 h10 v10 h-10 z M40,10 h20 v10 h-20 z M45,25 h15 v5 h-15 z M10,40 h15 v5 h-15 z M30,40 h10 v15 h-10 z M50,40 h20 v10 h-20 z M80,40 h10 v15 h-10 z M40,60 h15 v10 h-15 z M70,60 h20 v5 h-20 z M70,75 h10 v15 h-10 z M85,75 h5 v5 h-5 z" fill="black" />
                    </svg>
                  </div>
                </div>

                <button 
                  onClick={() => setShowGatePassModal(false)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
