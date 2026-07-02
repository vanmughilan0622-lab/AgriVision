"use client";

import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, X, Sprout, Droplets, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

function ActionCenterDrawerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const isOpen = searchParams.get('action_center') === 'true';
  const [timelineEvents, setTimelineEvents] = useState<any[]>([]);
  const [activeDrawerTab, setActiveDrawerTab] = useState<"timeline" | "tasks">("timeline");
  const { t } = useLanguage();

  const closeDrawer = () => {
    router.push(pathname, { scroll: false });
  };

  useEffect(() => {
    if (isOpen && timelineEvents.length === 0) {
      async function loadTimeline() {
        const { getFarmTimeline } = await import("@/app/actions/dashboard-actions");
        const res = await getFarmTimeline();
        if (res.success) setTimelineEvents(res.data || []);
      }
      loadTimeline();
    }
  }, [isOpen, timelineEvents.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[110]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-50 dark:bg-slate-950 shadow-2xl z-[120] border-l border-slate-200 dark:border-slate-800 flex flex-col"
          >
            <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-500 rounded-2xl">
                    <History className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{t("action.title")}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest">{t("action.subtitle")}</p>
                  </div>
                </div>
                <button onClick={closeDrawer} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <X className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
              
              <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  onClick={() => setActiveDrawerTab("timeline")}
                  className={cn("flex-1 py-2 text-sm font-black rounded-lg transition-all", activeDrawerTab === "timeline" ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
                >
                  {t("action.memory")}
                </button>
                <button
                  onClick={() => setActiveDrawerTab("tasks")}
                  className={cn("flex-1 py-2 text-sm font-black rounded-lg transition-all", activeDrawerTab === "tasks" ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
                >
                  {t("action.tasks")}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
              {activeDrawerTab === "timeline" && <div className="absolute left-10 md:left-12 top-8 bottom-8 w-0.5 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>}
              <div className="space-y-6 relative z-10">
                {(() => {
                  const filteredEvents = activeDrawerTab === "timeline" 
                    ? timelineEvents.filter(e => e.type === 'diagnosis' || (e.type === 'task' && e.status === 'Completed'))
                    : timelineEvents.filter(e => e.type === 'task' && e.status !== 'Completed');

                  if (filteredEvents.length === 0) {
                    return (
                      <div className="text-center py-12">
                        <p className="text-sm font-bold text-slate-400">
                          {activeDrawerTab === "timeline" ? t("action.noHistory") : t("action.noTasks")}
                        </p>
                      </div>
                    );
                  }

                  return filteredEvents.map((event: any, idx: number) => (
                    <div key={`${event.id}-${idx}`} className={cn("flex items-start group", activeDrawerTab === "timeline" ? "gap-4 md:gap-6" : "gap-0")}>
                      {activeDrawerTab === "timeline" && (
                        <div className={cn("hidden sm:flex w-8 h-8 rounded-full border-4 border-slate-50 dark:border-slate-950 items-center justify-center shrink-0 z-10 transition-colors mt-2", 
                          event.type === 'diagnosis' ? "bg-rose-100 dark:bg-rose-900/50 group-hover:bg-rose-200" : 
                          event.category === 'Irrigation' ? "bg-amber-100 dark:bg-amber-900/50 group-hover:bg-amber-200" :
                          "bg-emerald-100 dark:bg-emerald-900/50 group-hover:bg-emerald-200"
                        )}>
                          {event.type === 'diagnosis' ? <Sprout className={cn("h-3 w-3", event.severity === "High" ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400")} /> : 
                           event.category === 'Irrigation' ? <Droplets className="h-3 w-3 text-amber-600 dark:text-amber-400" /> :
                           <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />}
                        </div>
                      )}
                      <div className={cn("flex-1 p-5 rounded-3xl border shadow-sm hover:shadow-md transition-all duration-300 w-full", 
                        event.type === 'diagnosis' ? "bg-white dark:bg-slate-900 border-rose-100 dark:border-rose-900/30" : 
                        "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      )}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                            {t(event.title)}
                            {event.type === 'task' && event.status === 'Completed' && <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-[9px] text-emerald-700 dark:text-emerald-400 font-black uppercase tracking-widest border border-emerald-200 dark:border-emerald-800/50">{t("action.auto")}</span>}
                          </h4>
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0">
                            {activeDrawerTab === "tasks" && t("action.due")}{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t(event.description)}</p>
                        
                        {activeDrawerTab === "tasks" && (
                          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <span className="text-[10px] uppercase tracking-wider font-black px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 block">
                              {t("category." + event.category.toLowerCase())}
                            </span>
                            <span className="text-xs font-bold text-indigo-500 flex items-center gap-1">
                              {event.status === "Pending" ? t("action.scheduled") : event.status === "Completed" ? t("action.completed") : event.status}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function ActionCenterDrawer() {
  return (
    <Suspense fallback={null}>
      <ActionCenterDrawerContent />
    </Suspense>
  );
}
