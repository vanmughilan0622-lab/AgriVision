"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FarmHeatmapProps {
  cropStatus: any[];
  activeFilter: string;
  onSectorClick: (sector: string) => void;
}

export function FarmHeatmap({ cropStatus, activeFilter, onSectorClick }: FarmHeatmapProps) {
  // Pre-define a grid of 4 sectors to visually map the farm
  const mapGrid = [
    { id: "Sector 1", label: "Sector 1", row: 1, col: 1 },
    { id: "Sector 2", label: "Sector 2", row: 1, col: 2 },
    { id: "Sector 3", label: "Sector 3", row: 2, col: 1 },
    { id: "Sector 4", label: "Sector 4", row: 2, col: 2 },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-widest">Spatial Overview</h4>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase"><div className="w-2 h-2 rounded-full bg-rose-500" /> Critical</span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Good</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 aspect-square max-w-[280px] mx-auto">
        {mapGrid.map((block) => {
          // Find if there's an active crop in this sector
          const crop = cropStatus.find(c => c.sector === block.id);
          
          let bgColor = "bg-slate-200 dark:bg-slate-800";
          let borderColor = "border-slate-300 dark:border-slate-700";
          let pulse = false;

          if (crop) {
            if (crop.status === "Critical") {
              bgColor = "bg-rose-500/20";
              borderColor = "border-rose-500";
              pulse = true;
            } else if (crop.status === "Attention") {
              bgColor = "bg-amber-500/20";
              borderColor = "border-amber-500";
            } else if (crop.status === "Good") {
              bgColor = "bg-emerald-500/20";
              borderColor = "border-emerald-500";
            }
          }

          const isActive = activeFilter === block.id;

          return (
            <motion.button
              key={block.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSectorClick(isActive ? "All Sectors" : block.id)}
              className={cn(
                "relative flex flex-col items-center justify-center rounded-2xl border-2 transition-all overflow-hidden group",
                bgColor,
                borderColor,
                isActive ? "ring-4 ring-emerald-500/30" : "",
                !crop && "opacity-60 grayscale"
              )}
            >
              {pulse && (
                <div className="absolute inset-0 bg-rose-500/20 animate-pulse" />
              )}
              
              <span className={cn(
                "relative z-10 text-xs font-black tracking-widest uppercase mb-1",
                crop?.status === "Critical" ? "text-rose-600 dark:text-rose-400" :
                crop?.status === "Attention" ? "text-amber-600 dark:text-amber-400" :
                crop?.status === "Good" ? "text-emerald-600 dark:text-emerald-400" :
                "text-slate-500"
              )}>
                {block.label}
              </span>
              
              <span className="relative z-10 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                {crop ? crop.name : "Fallow"}
              </span>

              {/* Grid decorative lines */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:10px_10px]" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
