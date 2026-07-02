"use client";

import Link from "next/link";
import { ArrowLeft, User, Phone, Shield } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function ProfileClient({ user }: { user: any }) {
    const { t } = useLanguage();

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/settings" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white">{t("settings.profileDetails")}</h1>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-8">
                <div className="flex items-center gap-6">
                    <div className="p-5 bg-emerald-500/10 rounded-3xl">
                        <User className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-1">{t("profile.fullName")}</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{user.name || t("profile.na")}</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="p-5 bg-blue-500/10 rounded-3xl">
                        <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-1">{t("profile.phoneNumber")}</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{user.phone}</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="p-5 bg-violet-500/10 rounded-3xl">
                        <Shield className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-1">{t("profile.role")}</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white capitalize">{t("role." + user.role.toLowerCase()) || user.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
