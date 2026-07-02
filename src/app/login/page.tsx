"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Lock, Phone, User, ArrowRight, Globe, ChevronDown } from "lucide-react";
import { loginFarmer, registerFarmer } from "@/app/actions/auth-actions";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLanguage } from "@/lib/language-context";

function LoginForm() {
  const { lang, setLang, languages, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "register");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    try {
      let result;
      if (isLogin) {
        if (!formData.get("phone") || !formData.get("password")) {
            setError(t("auth.fillFields"));
            return;
        }
        result = await loginFarmer(formData);
      } else {
        if (!formData.get("name") || !formData.get("phone") || !formData.get("password")) {
            setError(t("auth.fillFields"));
            return;
        }
        result = await registerFarmer(formData);
      }

      if (result?.error) {
        setError(result.error);
      }
    } catch (err: any) {
      if (err.message === "NEXT_REDIRECT") {
        throw err; // Let Next.js handle the redirect
      }
      console.error(err);
      setError(err.message || "An unexpected error occurred connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 hover:border-slate-700 transition-all text-xs font-bold text-slate-300 hover:text-white"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-500" />
            <span>{languages.find(l => l.code === lang)?.name || "English"}</span>
            <ChevronDown className={`h-3 w-3 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showLangMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-44 bg-[#0a1224] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 p-1"
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                      lang === l.code
                        ? "bg-emerald-500/10 text-emerald-400 font-bold"
                        : "hover:bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>{l.name}</span>
                    <span className="text-[10px] text-slate-500">{l.nativeName}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[2rem] shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-emerald-500/10 rounded-2xl mb-4">
              <Leaf className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">{isLogin ? t("auth.welcomeBack") : t("auth.createAccount")}</h1>
            <p className="text-slate-400 text-center font-medium">
              {isLogin ? t("auth.signInDesc") : t("auth.joinDesc")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("auth.fullName")}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      required={!isLogin}
                      placeholder={t("auth.johnDoe")}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("auth.emailOrPhone")}</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  name="phone"
                  required
                  placeholder="email@example.com or +1 555-0000"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("auth.password")}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-red-400 text-sm font-medium text-center py-2"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 group transition-all mt-6 shadow-lg shadow-emerald-500/25"
            >
              {isLogin ? t("auth.signIn") : t("auth.createAccount")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-slate-400 hover:text-white transition-colors font-medium text-sm"
            >
              {isLogin ? t("auth.noAccount") : t("auth.hasAccount")}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020817]" />}>
      <LoginForm />
    </Suspense>
  );
}
