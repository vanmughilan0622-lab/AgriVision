"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Leaf, LayoutDashboard, ScanLine, Sprout, DollarSign, CloudSun,
    Settings, Menu, MessageSquare, BookOpen, Users, BarChart3, Truck, Globe, X, Activity
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { NotificationBell } from "@/components/ui/NotificationBell";
import { ActionCenterDrawer } from "@/components/ui/ActionCenterDrawer";
import { History } from "lucide-react";

const navItems = [
    { key: "nav.dashboard", href: "/dashboard", icon: LayoutDashboard },
    { key: "nav.disease", href: "/disease-detection", icon: ScanLine },
    { key: "nav.crophealth", href: "/crop-health", icon: Activity },
    { key: "nav.cropsuggestion", href: "/crop-suggestion", icon: Sprout },
    { key: "nav.croplibrary", href: "/crop-library", icon: BookOpen },
    { key: "nav.financials", href: "/financials", icon: DollarSign },
    { key: "nav.environment", href: "/environment", icon: CloudSun },
    { key: "nav.mandi", href: "/mandi-rates", icon: BarChart3 },
    { key: "nav.community", href: "/community", icon: Users },
    { key: "nav.transportation", href: "/transportation", icon: Truck },
    { key: "nav.settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isDesktopOpen, setIsDesktopOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [showLangPicker, setShowLangPicker] = useState(false);
    const { lang, setLang, t, languages } = useLanguage();

    // Persist sidebar state
    useEffect(() => {
        const saved = localStorage.getItem("sidebarOpen");
        if (saved !== null) {
            setIsDesktopOpen(saved === "true");
        }
    }, []);

    const toggleDesktopSidebar = () => {
        const newState = !isDesktopOpen;
        setIsDesktopOpen(newState);
        localStorage.setItem("sidebarOpen", String(newState));
    };

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 z-50 flex items-center px-4 justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm text-slate-700 dark:text-slate-300"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Leaf className="h-6 w-6 text-emerald-500" />
                        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">AgriVision</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <NotificationBell />
                    <button
                        onClick={() => {
                            const newParams = new URLSearchParams(window.location.search);
                            newParams.set('action_center', 'true');
                            window.history.pushState(null, '', `?${newParams.toString()}`);
                        }}
                        className="flex items-center justify-center p-2 rounded-xl border font-bold text-sm transition-all shadow-sm bg-indigo-600 text-white hover:bg-indigo-500 border-indigo-500/30 shrink-0"
                    >
                        <History className="h-5 w-5 shrink-0" />
                    </button>
                </div>
            </div>
            
            <ActionCenterDrawer />

            {/* Desktop Sidebar */}
            <motion.aside
                initial={{ width: isDesktopOpen ? 240 : 80 }}
                animate={{ width: isDesktopOpen ? 240 : 80 }}
                className={cn(
                    "hidden md:flex flex-col h-screen border-r border-white/10 bg-slate-950/40 backdrop-blur-2xl text-white sticky top-0 z-40",
                    !isDesktopOpen && "items-center"
                )}
            >
                {/* Header */}
                <div className="h-20 flex items-center w-full shrink-0 border-b border-white/10 px-5 gap-3">
                    <button onClick={toggleDesktopSidebar} className="p-2 hover:bg-white/10 text-slate-300 hover:text-white rounded-md transition-colors shrink-0">
                        <Menu className="h-6 w-6" />
                    </button>
                    {isDesktopOpen && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 overflow-hidden"
                        >
                            <Leaf className="h-8 w-8 text-emerald-400 shrink-0" />
                            <span className="text-xl font-bold tracking-tight whitespace-nowrap">AgriVision</span>
                        </motion.div>
                    )}
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 h-11 rounded-lg text-sm font-bold transition-colors relative group overflow-hidden whitespace-nowrap",
                                    isDesktopOpen ? "px-3 w-full" : "px-0 w-11 justify-center mx-auto",
                                    isActive
                                        ? "bg-emerald-500/20 text-emerald-400"
                                        : "hover:bg-white/10 text-slate-300 hover:text-white"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-emerald-400")} />
                                {isDesktopOpen && <span>{t(item.key)}</span>}
                                {!isDesktopOpen && (
                                    <div className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                        {t(item.key)}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Language Switcher */}
                <div className={cn("px-3 pb-6 relative", !isDesktopOpen && "flex justify-center")}>
                    <button
                        id="sidebar-lang-toggle"
                        onClick={() => setShowLangPicker(!showLangPicker)}
                        className={cn(
                            "flex items-center gap-2 h-11 rounded-lg text-sm font-bold transition-colors hover:bg-white/10 text-slate-300 hover:text-white overflow-hidden whitespace-nowrap",
                            isDesktopOpen ? "px-3 w-full" : "px-0 w-11 justify-center mx-auto"
                        )}
                    >
                        <Globe className="h-5 w-5 shrink-0 text-emerald-600" />
                        {isDesktopOpen && (
                            <span className="flex items-center gap-2 flex-1">
                                {t("nav.language")}
                                <span className="ml-auto text-[10px] font-black bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded-full uppercase">
                                    {languages.find(l => l.code === lang)?.label}
                                </span>
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {showLangPicker && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                className="absolute bottom-full left-0 right-0 mb-2 mx-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50"
                            >
                                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{t("nav.language")}</p>
                                    <button onClick={() => setShowLangPicker(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                                        <X className="h-3.5 w-3.5 text-slate-400" />
                                    </button>
                                </div>
                                <div className="p-2 grid grid-cols-2 gap-1">
                                    {languages.map((l) => (
                                        <button
                                            key={l.code}
                                            id={`lang-btn-${l.code}`}
                                            onClick={() => { setLang(l.code); setShowLangPicker(false); }}
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all",
                                                lang === l.code
                                                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-black"
                                                    : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                                            )}
                                        >
                                            <span className="text-base font-black w-6 text-center">{l.label}</span>
                                            <span className="text-xs">{l.nativeName}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="md:hidden fixed inset-0 z-[55] bg-slate-950/20 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="md:hidden fixed inset-y-0 left-0 w-64 bg-slate-950/90 backdrop-blur-2xl border-r border-white/10 z-[60] shadow-2xl flex flex-col text-white"
                        >
                            <div className="p-6 flex items-center gap-4 border-b border-white/10 shrink-0">
                                <button onClick={() => setIsMobileOpen(false)} className="p-2 hover:bg-white/10 rounded-md -ml-2">
                                    <Menu className="h-5 w-5 text-slate-300" />
                                </button>
                                <div className="flex items-center gap-2">
                                    <Leaf className="h-8 w-8 text-emerald-400" />
                                    <span className="text-xl font-bold">AgriVision</span>
                                </div>
                            </div>

                        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors",
                                        pathname === item.href ? "bg-emerald-500/20 text-emerald-400" : "hover:bg-white/10 text-slate-300 hover:text-white"
                                    )}
                                >
                                    <item.icon className="h-5 w-5 shrink-0" />
                                    <span>{t(item.key)}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile language grid */}
                        <div className="px-4 py-4 border-t border-white/10">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                <Globe className="h-3.5 w-3.5 text-emerald-600" /> {t("nav.language")}
                            </p>
                            <div className="grid grid-cols-4 gap-1">
                                {languages.map((l) => (
                                    <button
                                        key={l.code}
                                        onClick={() => setLang(l.code)}
                                        title={l.nativeName}
                                        className={cn(
                                            "py-2 rounded-xl text-sm font-black transition-all",
                                            lang === l.code
                                                ? "bg-emerald-600 text-white shadow"
                                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                                        )}
                                    >
                                        {l.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Top Right Actions */}
            <div className="hidden md:flex fixed top-4 right-8 z-50 items-center gap-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1rem] shadow-xl">
                <NotificationBell />
                <button
                    onClick={() => {
                        const newParams = new URLSearchParams(window.location.search);
                        newParams.set('action_center', 'true');
                        window.history.pushState(null, '', `?${newParams.toString()}`);
                    }}
                    className="flex items-center justify-center p-2 rounded-xl font-bold text-sm transition-all bg-indigo-600 text-white hover:bg-indigo-500 shrink-0"
                    title="Action Center"
                >
                    <History className="h-5 w-5 shrink-0" />
                </button>
            </div>
        </>
    );
}
