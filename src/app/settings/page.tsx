"use client";

import { Sun, Bell, User, Key, Save, ShieldCheck, Sparkles, Moon, Smartphone, HelpCircle, Languages, ChevronRight, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth-actions";

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

export default function SettingsPage() {
    const router = useRouter();
    const { lang: globalLang, setLang, languages, t } = useLanguage();
    const [notifications, setNotifications] = useState(true);
    const [hfToken, setHfToken] = useState("");
    const [geminiKey, setGeminiKey] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const savedHfToken = localStorage.getItem("hf_token");
        if (savedHfToken) setHfToken(savedHfToken);
        const savedGemini = localStorage.getItem("gemini_api_key");
        if (savedGemini) setGeminiKey(savedGemini);
    }, []);

    const saveLanguage = (code: string) => {
        setLang(code as any);
        localStorage.setItem("preferred_language", code);
    };

    const saveApiKey = () => {
        let updated = false;
        if (hfToken.trim()) {
            localStorage.setItem("hf_token", hfToken.trim());
            updated = true;
        }
        if (geminiKey.trim()) {
            localStorage.setItem("gemini_api_key", geminiKey.trim());
            updated = true;
        }
        if (updated) {
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-8 space-y-12 max-w-4xl mx-auto"
        >
            <motion.div variants={itemVariants} className="space-y-2">
                <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">{t("settings.title")}</span>
                </h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
                    {t("settings.subtitle")}
                </p>
            </motion.div>

            <div className="space-y-10 pb-20">
                {/* Preferences Grid */}
                <div className="grid md:grid-cols-1 gap-10">

                    {/* Profile Link */}
                    <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl group cursor-pointer hover:border-emerald-500/30 transition-colors" onClick={() => router.push('/settings/profile')}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-emerald-500/10 rounded-2xl">
                                    <User className="h-8 w-8 text-emerald-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">{t("settings.profileDetails")}</h2>
                                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">{t("settings.viewAccountInfo")}</p>
                                </div>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/20 transition-colors">
                                <ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-emerald-500" />
                            </div>
                        </div>
                    </motion.div>



                    {/* Notifications */}
                    <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl group">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-blue-500/10 rounded-2xl">
                                <Bell className="h-6 w-6 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">{t("settings.alerts")}</h2>
                        </div>

                        <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-950/50 rounded-[2rem] border border-transparent hover:border-blue-500/20 transition-all cursor-pointer"
                            onClick={() => setNotifications(!notifications)}>
                            <div className="flex items-center gap-4">
                                <Smartphone className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="font-black text-sm text-slate-800 dark:text-slate-200">{t("settings.push")}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{notifications ? t("settings.enabled") : t("settings.muted")}</p>
                                </div>
                            </div>
                            <div className={cn(
                                "relative w-14 h-8 rounded-full transition-colors p-1",
                                notifications ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-800"
                            )}>
                                <motion.div
                                    animate={{ x: notifications ? 24 : 0 }}
                                    className="w-6 h-6 bg-white rounded-full shadow-lg"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
                {/* Language Preference */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
                    <div className="p-10 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-4">
                        <div className="p-4 bg-violet-500/10 rounded-2xl">
                            <Languages className="h-6 w-6 text-violet-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">{t("settings.langPref")}</h2>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{t("settings.langDesc")}</p>
                        </div>
                    </div>
                    <div className="p-10">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {languages.map((l) => (
                                <button
                                    key={l.code}
                                    onClick={() => saveLanguage(l.code)}
                                    className={cn(
                                        "flex flex-col items-center gap-2 p-5 rounded-[1.5rem] border-2 transition-all duration-300 font-black",
                                        globalLang === l.code
                                            ? "border-violet-500 bg-violet-500/10 text-violet-700 dark:text-violet-400 shadow-lg shadow-violet-500/10"
                                            : "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-slate-500 hover:border-violet-300 hover:bg-violet-500/5"
                                    )}
                                >
                                    <span className="text-2xl">{l.nativeName || l.label}</span>
                                    <span className="text-[10px] uppercase tracking-widest">{l.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Logout Button */}
                <motion.div variants={itemVariants} className="pt-10">
                    <button 
                        onClick={async () => await logout()}
                        className="w-full flex items-center justify-center gap-3 p-6 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-[2rem] border-2 border-red-100 dark:border-red-500/20 transition-all font-black text-lg group"
                    >
                        <LogOut className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />{t("settings.signOut")}</button>
                </motion.div>
            </div>
        </motion.div>
    );
}
