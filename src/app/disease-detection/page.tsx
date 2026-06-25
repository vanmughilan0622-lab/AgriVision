'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle2, ShieldCheck, Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';
import { detectDiseaseFromImage } from '@/app/actions/detect-disease';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

export default function DiseaseDetectionPage() {
  const { t } = useLanguage();
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const farmSectors = [
    "Sector 1 - Corn",
    "Sector 2 - Wheat",
    "Sector 3 - Soybeans",
    "Sector 4 - Tomato"
  ];

  const handleAIDiagnosis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) return;
    
    setAiLoading(true);
    setError(null);
    try {
      // Normalize any image (WebP, PNG, etc) to standard JPEG using browser native decoder
      const img = new window.Image();
      img.src = URL.createObjectURL(photo);
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
      }
      
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.95);
      });

      const formData = new FormData();
      formData.append("image", blob, "normalized.jpg");
      
      const result = await detectDiseaseFromImage(formData);
      if (result.success && result.data) {
        setAiResult(result.data);
      } else {
        setError(result.error || "Failed to generate AI diagnosis.");
      }
    } catch (err: any) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setAiLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 md:p-10 max-w-4xl mx-auto space-y-8"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 space-y-2 md:space-y-0">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <ShieldCheck className="h-10 w-10 text-emerald-500 fill-emerald-500" />
            {t("disease.pageTitle")}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
            {t("disease.pageSubtitle")}
          </p>
        </div>
        <Link 
          href="/history" 
          className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold transition-colors shadow-sm"
        >
          {t("disease.viewHistory")}
        </Link>
      </motion.div>

      <motion.form variants={itemVariants} onSubmit={handleAIDiagnosis} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-xl">
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-500">
            <AlertTriangle className="w-5 h-5" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="mb-6 space-y-2">
          <label className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">
            {t("disease.selectField")} <span className="text-red-500">*</span>
          </label>
          <select 
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none"
            required
          >
            <option value="" disabled>{t("disease.selectPlaceholder")}</option>
            {farmSectors.map(sector => (
              <option key={sector} value={sector}>{t(`sector.${sector.split(" - ")[0]}`)} - {t(`crop.${sector.split(" - ")[1]}`)}</option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4">
            {t("disease.uploadCropImage")} <span className="text-red-500">*</span>
          </label>
          <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group relative overflow-hidden block w-full">
            {photo ? (
              <div className="flex flex-col items-center gap-3 w-full">
                {photoPreview && (
                  <div className="relative w-full max-w-sm h-64 rounded-2xl overflow-hidden shadow-sm mb-2 border border-slate-200 dark:border-slate-700">
                    <img src={photoPreview} alt="Uploaded crop" className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 p-1.5 bg-emerald-500 text-white rounded-full shadow-md">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                )}
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 max-w-[200px] truncate">{photo.name}</span>
                <span className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline underline-offset-4 mt-1">{t("disease.tapToChange")}</span>
              </div>
            ) : (
              <>
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-3xl mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                </div>
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{t("disease.tapToTake")}</span>
              </>
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setPhoto(file);
                  setPhotoPreview(URL.createObjectURL(file));
                  setAiResult(null); // reset result
                }
              }}
            />
          </label>
        </div>

        {!aiResult ? (
          <div className="flex justify-center">
            <button 
              type="submit"
              disabled={aiLoading || !photo || !selectedField}
              className="w-full max-w-md flex items-center justify-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black p-6 rounded-[1.5rem] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 group"
            >
              {aiLoading ? (
                <RefreshCw className="w-8 h-8 animate-spin" />
              ) : (
                <Sparkles className="w-8 h-8 group-hover:scale-110 transition-transform" />
              )}
              <span className="text-lg">{t("disease.analyze")}</span>
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-[2rem] p-8 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
              <div className="flex-1 space-y-6 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-500 rounded-2xl">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-indigo-900 dark:text-indigo-300 capitalize">{aiResult.diseaseName}</h3>
                  </div>
                  <div className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-bold",
                    aiResult.severity === "High" ? "bg-red-500/20 text-red-600 dark:text-red-400" :
                    aiResult.severity === "Medium" ? "bg-amber-500/20 text-amber-600 dark:text-amber-400" :
                    "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  )}>
                    {t("disease.severity")} {t(`status.${aiResult.severity}`) || aiResult.severity}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                   <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t("disease.description")}</h4>
                   <p className="text-slate-600 dark:text-slate-300">{aiResult.description}</p>
                </div>

                <div className="bg-indigo-500/10 dark:bg-indigo-950/30 rounded-2xl p-6 border border-indigo-500/20 shadow-sm">
                   <div className="flex items-center gap-2 mb-2">
                       <Sparkles className="w-5 h-5 text-indigo-500" />
                       <h4 className="font-black text-indigo-900 dark:text-indigo-400">{t("disease.explainableAI")}</h4>
                   </div>
                   <p className="text-indigo-800 dark:text-indigo-300/80 text-sm italic leading-relaxed">"{aiResult.explainability}"</p>
                </div>

                {aiResult.riskMetrics && (() => {
                  try {
                    const metrics = JSON.parse(aiResult.riskMetrics);
                    return (
                      <div className="bg-white dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mt-6">
                        <h4 className="font-black text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs">{t("disease.riskForecast")}</h4>
                        <div className="space-y-4">
                          {Object.entries(metrics).map(([key, value]: any) => (
                            <div key={key}>
                              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span>{value}%</span>
                              </div>
                              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5">
                                <div 
                                  className={cn("h-2.5 rounded-full transition-all duration-1000", 
                                    value > 75 ? "bg-red-500" : value > 40 ? "bg-amber-500" : "bg-emerald-500"
                                  )} 
                                  style={{ width: `${value}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  } catch (e) { return null; }
                })()}

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-900/50">
                    <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-2">{t("disease.recommendedTreatment")}</h4>
                    <p className="text-amber-800 dark:text-amber-200/80 text-sm">{aiResult.recommendedTreatment}</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-900/50">
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-400 mb-2">{t("disease.preventionTips")}</h4>
                    <p className="text-emerald-800 dark:text-emerald-200/80 text-sm">{aiResult.preventionTips}</p>
                  </div>
                </div>

                {aiResult.tasks && aiResult.tasks.length > 0 && (
                  <div className="mt-8 relative">
                    <div className="absolute left-9 top-14 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
                    <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">{t("disease.aiTimeline")}</h4>
                    <div className="space-y-4 relative z-10">
                      
                      {/* Timeline Origin */}
                      <div className="flex items-center gap-4 p-4 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl shadow-sm relative">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border-4 border-white dark:border-slate-950 flex items-center justify-center shrink-0 z-10 hidden sm:flex">
                          <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-sm text-indigo-900 dark:text-indigo-300">{t("disease.todayDiagnosis")}</h5>
                          <p className="text-xs text-indigo-800/70 dark:text-indigo-300/70 mt-1">{aiResult.diseaseName} {t("disease.detected")}</p>
                        </div>
                      </div>

                      {aiResult.tasks.map((task: any, idx: number) => {
                        const days = task.dueDays || Math.ceil((new Date(task.dueDate).getTime() - Date.now()) / (1000 * 3600 * 24));
                        return (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm relative group hover:border-emerald-500/30 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-950 flex items-center justify-center shrink-0 z-10 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 hidden sm:flex transition-colors">
                            <CheckCircle2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-bold text-sm text-slate-900 dark:text-white">{task.title}</h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{task.description}</p>
                          </div>
                          <div className="ml-auto text-right shrink-0">
                            <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg text-slate-500">{task.category}</span>
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                              {days === 0 ? t("disease.today") : days === 1 ? t("disease.tomorrow") : t("disease.inDays").replace("{days}", days.toString())}
                            </p>
                          </div>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center justify-between pt-4 border-t border-indigo-200 dark:border-indigo-800 mt-6">
                  <span>{t("disease.aiConfidence")} {aiResult.confidenceScore.toFixed(1)}%</span>
                  <Link href="/history" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    {t("disease.viewInHistory")} &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </motion.form>
    </motion.div>
  );
}
