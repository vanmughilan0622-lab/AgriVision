"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/app/actions/dashboard-actions";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";
import { Activity, ShieldAlert, HeartPulse, ScanFace, TrendingUp } from "lucide-react";
import { format } from "date-fns";

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const res = await getDashboardStats();
      if (res.success) {
        setStats(res.data);
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          <Activity className="h-10 w-10 text-emerald-500" />
          Smart Farm Analytics
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
          Monitor your crop health, disease trends, and overall farm performance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-slate-500 uppercase">Total Scans</span>
            <div className="p-2 bg-indigo-500/10 rounded-xl"><ScanFace className="w-5 h-5 text-indigo-500" /></div>
          </div>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalScans}</h3>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-slate-500 uppercase">Diseases Detected</span>
            <div className="p-2 bg-rose-500/10 rounded-xl"><ShieldAlert className="w-5 h-5 text-rose-500" /></div>
          </div>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white">{stats.diseasesDetected}</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-slate-500 uppercase">Healthy Crops</span>
            <div className="p-2 bg-emerald-500/10 rounded-xl"><HeartPulse className="w-5 h-5 text-emerald-500" /></div>
          </div>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white">{stats.healthyPercentage}%</h3>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 rounded-[2rem] shadow-xl shadow-emerald-500/20 text-white flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-emerald-100 uppercase">Farm Health Score</span>
            <div className="p-2 bg-white/20 rounded-xl"><TrendingUp className="w-5 h-5 text-white" /></div>
          </div>
          <h3 className="text-4xl font-black">{stats.farmHealthScore} / 100</h3>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Charts */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Disease Outbreak Trends</h3>
          {stats.trends.length > 0 ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.trends}>
                  <defs>
                    <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="cases" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCases)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-slate-400">
              No trend data available yet.
            </div>
          )}
        </div>

        {/* Recent Diagnoses */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Recent Scans</h3>
          <div className="space-y-4">
            {stats.recentDiagnoses.length === 0 ? (
              <p className="text-slate-400 text-sm">No recent scans.</p>
            ) : (
              stats.recentDiagnoses.map((scan: any) => (
                <div key={scan.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <div className={`w-3 h-3 rounded-full ${
                    scan.severity === 'High' ? 'bg-red-500' : 
                    scan.severity === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white capitalize">{scan.diseaseName}</h4>
                    <p className="text-xs text-slate-500">{format(new Date(scan.createdAt), "MMM d, h:mm a")}</p>
                  </div>
                  <div className="text-xs font-bold text-slate-400">
                    {scan.confidenceScore.toFixed(0)}%
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
