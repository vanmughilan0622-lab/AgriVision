"use client";

// Force fresh deployment
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Shield, Zap, Activity, Bot, Clock, LifeBuoy, Users, CloudRain, ChartBar, Globe, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getUserProfile } from "@/app/actions/auth-actions";
import { useLanguage } from "@/lib/language-context";

// Apple-like spring transitions
const springTransition = { type: "spring", stiffness: 100, damping: 20, mass: 1 };
const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1]; // Custom cubic-bezier for Apple-like smoothness

const revealVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { duration: 1, ease: smoothEase }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(15px)", y: 40 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)", 
    y: 0,
    transition: { duration: 1.2, ease: smoothEase }
  }
};

const textStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const textItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: smoothEase }
  }
};

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const containerRef = useRef(null);
  const { lang, setLang, languages, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  // Parallax scrolling for background
  const { scrollYProgress } = useScroll();
  const yBg1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    getUserProfile().then((user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  return (
    <div ref={containerRef} className="bg-[#020817] text-white overflow-hidden relative font-sans selection:bg-emerald-500/30">
      {/* Background Orbs with Parallax */}
      <motion.div style={{ y: yBg1 }} className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <motion.div style={{ y: yBg2 }} className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="fixed w-full z-50 bg-[#020817]/60 backdrop-blur-xl border-b border-white/5 saturate-150"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Leaf className="h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-black tracking-tight text-white">AgriVision</span>
          </motion.div>
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-slate-900/50 hover:bg-slate-800/50 hover:border-white/20 transition-all text-xs font-bold text-slate-300 hover:text-white"
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
                    className="absolute right-0 mt-2 w-44 bg-[#0a1224] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 p-1"
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

            {isLoggedIn === null ? null : isLoggedIn ? (
              <Link href="/dashboard">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-full transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >{t("landing.openDash")}</motion.button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">{t("landing.login")}</Link>
                <Link href="/login?mode=register">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-full transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >{t("landing.signUp")}</motion.button>
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Screen 1: Hero Section */}
      <section className="relative z-10 min-h-[100dvh] flex items-center justify-center pt-20 px-6 text-center">
        <motion.div
          style={{ opacity: opacityHero, scale: scaleHero }}
          className="max-w-5xl mx-auto space-y-8 flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: smoothEase }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-emerald-400 text-sm font-bold tracking-widest uppercase shadow-2xl"
          >
            <Zap className="h-4 w-4" /> {t("landing.heroTag")}</motion.div>
          
          <motion.h1 
            variants={textStagger}
            initial="hidden"
            animate="visible"
            className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[1.1]"
          >
            <motion.span variants={textItem} className="block">{t("landing.heroTitle1")}</motion.span>
            <motion.span variants={textItem} className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 pb-4">{t("landing.heroTitle2")}</motion.span>
          </motion.h1>
          
          <motion.p 
            variants={textItem}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed"
          >{t("landing.heroDesc")}</motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: smoothEase }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 w-full"
          >
            {isLoggedIn === null ? (
              <div className="h-16" />
            ) : isLoggedIn ? (
              <Link href="/dashboard" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-[0_10px_40px_rgba(16,185,129,0.3)] group"
                >{t("landing.openDash")}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            ) : (
              <>
                <Link href="/login?mode=register" className="w-full sm:w-auto block">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full px-10 py-5 bg-white text-slate-900 hover:bg-slate-100 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-xl group cursor-pointer"
                  >{t("landing.getStarted")}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
                <Link href="/login" className="w-full sm:w-auto block">
                   <motion.div 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white rounded-full font-bold text-lg transition-colors flex items-center justify-center cursor-pointer"
                  >{t("landing.signIn")}</motion.div>
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Reusable Section Component for consistency */}
      {[
        {
          title: t("landing.f1Title"),
          highlight: t("landing.f1Highlight"),
          desc: t("landing.f1Desc"),
          icon: Shield, color: "emerald", img: "/disease_detection.png", reverse: false
        },
        {
          title: t("landing.f2Title"),
          highlight: t("landing.f2Highlight"),
          desc: t("landing.f2Desc"),
          icon: Bot, color: "blue", img: "/valya_agent.png", reverse: true
        },
        {
          title: t("landing.f3Title"),
          highlight: t("landing.f3Highlight"),
          desc: t("landing.f3Desc"),
          icon: Clock, color: "purple", img: "/ai_advice.png", reverse: false
        },
        {
          title: t("landing.f4Title"),
          highlight: t("landing.f4Highlight"),
          desc: t("landing.f4Desc"),
          icon: LifeBuoy, color: "orange", img: "/support_experts.png", reverse: true
        },
        {
          title: t("landing.f5Title"),
          highlight: t("landing.f5Highlight"),
          desc: t("landing.f5Desc"),
          icon: Activity, color: "emerald", img: "/real_time_vitals.png", reverse: false
        },
        {
          title: t("landing.f6Title"),
          highlight: t("landing.f6Highlight"),
          desc: t("landing.f6Desc"),
          icon: ChartBar, color: "amber", img: "/yield_prediction.png", reverse: true
        },
        {
          title: t("landing.f7Title"),
          highlight: t("landing.f7Highlight"),
          desc: t("landing.f7Desc"),
          icon: Users, color: "blue", img: "/community_market.png", reverse: false
        },
        {
          title: t("landing.f8Title"),
          highlight: t("landing.f8Highlight"),
          desc: t("landing.f8Desc"),
          icon: CloudRain, color: "cyan", img: "/environmental_insights.png", reverse: true
        }
      ].map((section, idx) => (
        <section key={idx} className={`relative z-10 min-h-screen flex items-center px-6 py-32 ${section.reverse ? 'bg-slate-900/30' : ''}`}>
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div 
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              viewport={{ once: true, margin: "0px" }}
              className={`space-y-8 ${section.reverse ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`p-5 bg-${section.color}-500/10 rounded-3xl w-max backdrop-blur-md border border-${section.color}-500/20`}
              >
                <section.icon className={`h-8 w-8 text-${section.color}-400`} />
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
                {section.title.split(section.highlight)[0]}
                <span className={`text-${section.color}-400`}>{section.highlight}</span>
                {section.title.split(section.highlight)[1]}
              </h2>
              <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium">
                {section.desc}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`relative h-[500px] md:h-[700px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl ${section.reverse ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}
            >
              <img src={`${section.img}`} alt={section.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </section>
      ))}

      {/* Screen 10: Final CTA */}
      <section className="relative z-10 flex items-center justify-center px-6 py-40 md:py-64 text-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: smoothEase }}
          className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent pointer-events-none" 
        />
        
        <motion.div 
          variants={textStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto space-y-12 relative z-10"
        >
          <motion.h2 variants={textItem} className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[1.1]">
            {t("landing.ctaTitle").split(t("landing.ctaHighlight"))[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">{t("landing.ctaHighlight")}</span>
            {t("landing.ctaTitle").split(t("landing.ctaHighlight"))[1]}
          </motion.h2>
          <motion.p variants={textItem} className="text-2xl text-slate-400 font-medium max-w-3xl mx-auto">{t("landing.ctaDesc")}</motion.p>
          
          <motion.div variants={textItem} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            {isLoggedIn === null ? (
              <div className="h-20" />
            ) : isLoggedIn ? (
              <Link href="/dashboard" className="w-full sm:w-auto block">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-max px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-black text-xl transition-colors flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(16,185,129,0.4)] group whitespace-nowrap cursor-pointer"
                >{t("landing.openDash")}
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </motion.div>
              </Link>
            ) : (
              <Link href="/login?mode=register" className="w-full sm:w-auto block">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-max px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-black text-xl transition-colors flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(16,185,129,0.4)] group whitespace-nowrap cursor-pointer"
                >{t("landing.getStartedFree")}
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </motion.div>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
