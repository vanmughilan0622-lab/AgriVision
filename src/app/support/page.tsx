"use client";

import { Ticket, MessageCircle, Bot, Mail, ArrowLeft } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const colorStyles: Record<string, { bg: string, text: string }> = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400' }
};

export default function SupportPage() {
    const { t } = useLanguage();
  const supportOptions = [
    {
      title: t("support.raiseTicketTitle"),
      description: t("support.raiseTicketDesc"),
      icon: Ticket,
      color: "emerald",
      href: "mailto:support@agrivision.com?subject=New%20Support%20Ticket",
    },
    {
      title: t("support.careChatTitle"),
      description: t("support.careChatDesc"),
      icon: MessageCircle,
      color: "blue",
      href: "mailto:care@agrivision.com?subject=Customer%20Care%20Chat%20Request",
    },
    {
      title: t("support.aiChatTitle"),
      description: t("support.aiChatDesc"),
      icon: Bot,
      color: "violet",
      href: "/advisor",
    },
    {
      title: t("support.emailTitle"),
      description: t("support.emailDesc"),
      icon: Mail,
      color: "orange",
      href: "mailto:contact@agrivision.com",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-8 space-y-8 max-w-5xl mx-auto pb-24"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-4 mb-2">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </Link>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">{t("support.title")}</span>
        </h1>
      </motion.div>
      <motion.p variants={itemVariants} className="text-xl text-slate-500 dark:text-slate-400 font-medium ml-2 md:ml-12">{t("support.subtitle")}</motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 md:ml-10">
        {supportOptions.map((option, index) => {
          const Icon = option.icon;
          const styles = colorStyles[option.color];
          return (
            <motion.div key={index} variants={itemVariants}>
              <Link href={option.href}>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-slate-200 dark:hover:border-slate-700 transition-all group h-full flex flex-col">
                  <div className={cn("p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300", styles.bg)}>
                    <Icon className={cn("h-8 w-8", styles.text)} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">{option.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{option.description}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
