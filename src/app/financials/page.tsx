"use client";

import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, Plus, Calendar, Filter, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock financial data
const summary = {
    income: 125000,
    expenses: 45000,
    netProfit: 80000,
    growth: 12.5,
};

const transactions = [
    { id: 1, type: "income", description: "Wheat Harvest Sale", amount: 45000, date: "2024-02-15", category: "Sales" },
    { id: 2, type: "expense", description: "Fertilizer Purchase", amount: 2500, date: "2024-02-12", category: "Supplies" },
    { id: 3, type: "expense", description: "Irrigation Maintenance", amount: 800, date: "2024-02-10", category: "Maintenance" },
    { id: 4, type: "income", description: "Corn Sale Advance", amount: 15000, date: "2024-02-08", category: "Sales" },
    { id: 5, type: "expense", description: "Labor Costs - Jan", amount: 5000, date: "2024-02-01", category: "Labor" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
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

export default function FinancialsPage() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-8 space-y-12 max-w-7xl mx-auto"
        >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                        Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Hub</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
                        Real-time fiscal monitoring and profit choreography.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                        <Download className="h-5 w-5" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
                        <Plus className="h-5 w-5" />
                        Add Record
                    </button>
                </div>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { label: "Total Revenue", value: summary.income, growth: "+15%", icon: TrendingUp, color: "emerald" },
                    { label: "Operating Costs", value: summary.expenses, growth: "+4%", icon: TrendingDown, color: "rose" },
                    { label: "Net Yield (AI)", value: summary.netProfit, growth: "Healthy", icon: DollarSign, color: "amber" }
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={cn(
                            "relative p-8 rounded-[2.5rem] shadow-2xl overflow-hidden border transition-all duration-500 group",
                            card.color === "emerald" ? "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-800/50" :
                                card.color === "rose" ? "bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-800/50" :
                                    "bg-slate-900 border-slate-800 text-white"
                        )}
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <card.icon className="h-24 w-24" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                            <div className="space-y-1">
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-[0.2em]",
                                    card.color === "emerald" ? "text-emerald-600" :
                                        card.color === "rose" ? "text-rose-600" : "text-slate-400"
                                )}>
                                    {card.label}
                                </span>
                                <div className="text-4xl font-black tracking-tight" suppressHydrationWarning>
                                    ₹{card.value.toLocaleString()}
                                </div>
                            </div>

                            <div className={cn(
                                "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black w-fit",
                                card.color === "emerald" ? "bg-emerald-500/10 text-emerald-600" :
                                    card.color === "rose" ? "bg-rose-500/10 text-rose-600" : "bg-emerald-500 text-white"
                            )}>
                                {card.growth.includes("+") ? <ArrowUpRight className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                                {card.growth} vs Last Month
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Transactions Table */}
            <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
            >
                <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Recent Ledger</h3>
                    <div className="flex gap-2">
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <Filter className="h-5 w-5 text-slate-500" />
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <Calendar className="h-5 w-5 text-slate-500" />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="px-10 py-6">Description</th>
                                <th className="px-10 py-6">Category</th>
                                <th className="px-10 py-6">Date</th>
                                <th className="px-10 py-6 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <AnimatePresence>
                                {transactions.map((t, idx) => (
                                    <motion.tr
                                        key={t.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer"
                                    >
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300",
                                                    t.type === 'income' ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                                                )}>
                                                    {t.type === 'income' ? <ArrowDownLeft className="h-6 w-6" /> : <ArrowUpRight className="h-6 w-6" />}
                                                </div>
                                                <span className="font-bold text-lg text-slate-800 dark:text-slate-200">{t.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                                {t.category}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8 text-slate-400 dark:text-slate-600 font-medium">{t.date}</td>
                                        <td className={cn(
                                            "px-10 py-8 text-right font-black text-xl",
                                            t.type === 'income' ? "text-emerald-600" : "text-rose-600"
                                        )} suppressHydrationWarning>
                                            {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
}
