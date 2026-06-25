"use client";

import { useEffect, useState } from "react";
import { getDiagnosisHistory } from "@/app/actions/history-actions";
import { format } from "date-fns";
import { Search, Filter, History, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchHistory() {
      const res = await getDiagnosisHistory();
      if (res.success && res.data) {
        setHistory(res.data);
      }
      setLoading(false);
    }
    fetchHistory();
  }, []);

  const filteredHistory = history.filter(scan => 
    scan.diseaseName.toLowerCase().includes(search.toLowerCase()) || 
    scan.cropType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          <History className="h-8 w-8 text-emerald-500" />
          Diagnosis History
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          View all your past AI crop disease scans and their outcomes.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by disease or crop..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
          ))}
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
          <History className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No History Found</h3>
          <p className="text-slate-500">You haven't performed any crop scans yet.</p>
          <Link href="/disease-detection" className="mt-4 inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium">
            Start New Scan
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredHistory.map((scan) => (
            <div key={scan.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-6 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="w-full sm:w-24 h-32 sm:h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700 relative">
                {scan.imagePath && scan.imagePath !== "/placeholder-plant.jpg" ? (
                  <img src={scan.imagePath} alt={scan.diseaseName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500">
                    <History className="w-8 h-8" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 w-full min-w-0">
                <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-3 mb-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate capitalize">{scan.diseaseName}</h3>
                    <p className="text-sm text-slate-500 flex flex-wrap items-center gap-1.5 mt-1">
                      <span className="truncate max-w-[120px] sm:max-w-none">{scan.cropType}</span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="whitespace-nowrap">{format(new Date(scan.createdAt), "MMM d, yy 'at' h:mm a")}</span>
                    </p>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap",
                    scan.severity === "High" ? "bg-red-500/20 text-red-600 dark:text-red-400" :
                    scan.severity === "Medium" ? "bg-amber-500/20 text-amber-600 dark:text-amber-400" :
                    "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  )}>
                    {scan.severity}
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {scan.description}
                </p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs font-semibold text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded">
                    {scan.confidenceScore.toFixed(1)}% Confidence
                  </div>
                  <button className="text-emerald-600 dark:text-emerald-400 font-medium text-sm flex items-center hover:underline">
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
