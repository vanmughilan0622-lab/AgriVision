'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Calculator, LineChart, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MandiRate {
  name: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

interface MandiData {
  crop: string;
  state: string;
  mandis: MandiRate[];
}

export default function MandiRatesPage() {
  const [data, setData] = useState<MandiData | null>(null);
  const [loading, setLoading] = useState(true);

  // ROI Calculator State
  const [area, setArea] = useState<number>(1);
  const [yieldPerAcre, setYieldPerAcre] = useState<number>(15);
  const [selectedMandiPrice, setSelectedMandiPrice] = useState<number>(2350);
  const [inputCostPerAcre, setInputCostPerAcre] = useState<number>(10000);

  useEffect(() => {
    fetch('/api/mandi/rates?crop=Wheat&state=Maharashtra')
      .then(res => res.json())
      .then((data: MandiData) => {
        setData(data);
        if (data.mandis && data.mandis.length > 0) {
          setSelectedMandiPrice(data.mandis[0].modalPrice);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalYield = area * yieldPerAcre;
  const expectedRevenue = totalYield * selectedMandiPrice;
  const totalCost = inputCostPerAcre * area;
  const netProfit = expectedRevenue - totalCost;
  const profitMargin = expectedRevenue > 0 ? ((netProfit / expectedRevenue) * 100).toFixed(1) : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest">Loading APMC Rates...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 md:p-10 max-w-7xl mx-auto space-y-10"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          <LineChart className="h-10 w-10 text-emerald-500" />
          Live Mandi Rates
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
          Real-time APMC data sourced securely for {data?.state}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.mandis.map((mandi, idx) => (
          <motion.div 
            variants={itemVariants}
            key={idx} 
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => setSelectedMandiPrice(mandi.modalPrice)}
            className={cn(
              "group cursor-pointer p-6 bg-white dark:bg-slate-900 rounded-[2rem] border transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
              selectedMandiPrice === mandi.modalPrice 
                ? "border-emerald-500 shadow-[0_20px_50px_rgba(16,185,129,0.2)]" 
                : "border-slate-200 dark:border-slate-800 hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)]"
            )}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">{mandi.name}</h3>
              <div className={cn(
                "p-2 rounded-xl flex items-center justify-center",
                mandi.trend === 'up' ? "bg-emerald-500/10 text-emerald-500" :
                mandi.trend === 'down' ? "bg-rose-500/10 text-rose-500" :
                "bg-slate-500/10 text-slate-500"
              )}>
                {mandi.trend === 'up' ? <TrendingUp className="w-5 h-5" /> :
                 mandi.trend === 'down' ? <TrendingDown className="w-5 h-5" /> :
                 <Minus className="w-5 h-5" />}
              </div>
            </div>
            
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-black text-slate-900 dark:text-white">₹{mandi.modalPrice}</span>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">/{mandi.unit}</span>
            </div>
            
            <div className="flex justify-between items-center mt-6 p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Min Price</p>
                <p className="font-bold text-slate-700 dark:text-slate-300">₹{mandi.minPrice}</p>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Max Price</p>
                <p className="font-bold text-slate-700 dark:text-slate-300">₹{mandi.maxPrice}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-500/10 rounded-2xl">
            <Calculator className="w-6 h-6 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Crop ROI Calculator</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Farm Area (Acres)</label>
              <input 
                type="number" 
                value={area} 
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Expected Yield (Quintals/Acre)</label>
              <input 
                type="number" 
                value={yieldPerAcre} 
                onChange={(e) => setYieldPerAcre(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Total Input Costs per Acre (₹)</label>
              <input 
                type="number" 
                value={inputCostPerAcre} 
                onChange={(e) => setInputCostPerAcre(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-950 rounded-[2rem] p-8 flex flex-col justify-center shadow-inner relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-5">
              <Coins className="w-48 h-48 text-white" />
            </div>

            <div className="space-y-6 relative z-10">
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-400">Total Yield</span>
                <span className="text-xl font-black text-white">{totalYield} q</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-400">Expected Revenue</span>
                <span className="text-xl font-black text-white">₹{expectedRevenue.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-slate-800 pb-6">
                <span className="text-sm font-bold text-slate-400">Input Costs</span>
                <span className="text-xl font-black text-rose-400">- ₹{totalCost.toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-2">
                <span className="block text-sm font-bold text-slate-400 mb-2">Estimated Net Profit</span>
                <div className="flex items-end gap-4">
                  <span className="text-5xl font-black text-emerald-400">₹{netProfit.toLocaleString('en-IN')}</span>
                  <span className="text-sm font-bold text-emerald-400/80 mb-2 bg-emerald-500/10 px-3 py-1 rounded-full">{profitMargin}% Margin</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </motion.div>

    </motion.div>
  );
}
