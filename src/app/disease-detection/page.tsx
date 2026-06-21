'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle2, ShieldCheck, Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';
import { detectDiseaseFromImage } from '@/app/actions/detect-disease';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function DiseaseDetectionPage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAIDiagnosis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) return;
    
    setAiLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", photo);
      
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
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          <ShieldCheck className="h-10 w-10 text-emerald-500 fill-emerald-500" />
          AI Crop Disease Detection
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
          Upload a photo of your sick crop for an instant AI diagnosis and actionable treatment plan.
        </p>
      </motion.div>

      <motion.form variants={itemVariants} onSubmit={handleAIDiagnosis} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-xl">
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-500">
            <AlertTriangle className="w-5 h-5" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="mb-8">
          <label className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4">
            Upload Crop Image
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
                <span className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline underline-offset-4 mt-1">Tap to change photo</span>
              </div>
            ) : (
              <>
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-3xl mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                </div>
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Tap to take photo or upload from gallery</span>
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
              disabled={aiLoading || !photo}
              className="w-full max-w-md flex items-center justify-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black p-6 rounded-[1.5rem] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 group"
            >
              {aiLoading ? (
                <RefreshCw className="w-8 h-8 animate-spin" />
              ) : (
                <Sparkles className="w-8 h-8 group-hover:scale-110 transition-transform" />
              )}
              <span className="text-lg">Analyze Image with AI</span>
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
                    Severity: {aiResult.severity}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                   <h4 className="font-bold text-slate-900 dark:text-white mb-2">Description</h4>
                   <p className="text-slate-600 dark:text-slate-300">{aiResult.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-900/50">
                    <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-2">Recommended Treatment</h4>
                    <p className="text-amber-800 dark:text-amber-200/80 text-sm">{aiResult.recommendedTreatment}</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-900/50">
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-400 mb-2">Prevention Tips</h4>
                    <p className="text-emerald-800 dark:text-emerald-200/80 text-sm">{aiResult.preventionTips}</p>
                  </div>
                </div>
                
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center justify-between pt-4 border-t border-indigo-200 dark:border-indigo-800">
                  <span>AI Confidence Score: {aiResult.confidenceScore.toFixed(1)}%</span>
                  <Link href="/history" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    View in History &rarr;
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
