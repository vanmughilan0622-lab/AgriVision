"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, AlertCircle, Sparkles, Loader2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { chatWithHuggingFace } from "@/app/actions/chat-hf";
import { useLanguage } from "@/lib/language-context";

interface Message {
    role: "user" | "assistant";
    content: string;
}



const quickPrompts = [
    "Best fertilizer for wheat?",
    "How to control tomato blight?",
    "When to irrigate rice?",
    "Organic pest control methods",
    "Soil pH correction tips",
];

function renderMessageContent(content: string) {
    const lines = content.split("\n");
    return lines.map((line, i) => {
        if (/^\d+\.\s/.test(line)) {
            return (
                <div key={i} className="flex gap-2 items-start">
                    <span className="text-emerald-500 font-black shrink-0 mt-0.5 text-sm">{line.match(/^\d+/)?.[0]}.</span>
                    <span>{line.replace(/^\d+\.\s/, "")}</span>
                </div>
            );
        }
        if (line.startsWith("• ")) {
            return (
                <div key={i} className="flex gap-2 items-start">
                    <span className="text-emerald-400 shrink-0 mt-1">•</span>
                    <span>{line.slice(2)}</span>
                </div>
            );
        }
        if (line.trim() === "") return <div key={i} className="h-2" />;
        return <p key={i}>{line}</p>;
    });
}

export default function AdvisorPage() {
    const { lang: globalLang, setLang: setGlobalLang, t, languages } = useLanguage();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [language, setLanguage] = useState<string>(globalLang);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const key = localStorage.getItem("huggingface_api_key");
        setApiKey(key);
        setLanguage(globalLang);
    }, [globalLang]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSubmit = async (e?: React.FormEvent, overrideInput?: string) => {
        e?.preventDefault();
        const query = (overrideInput ?? input).trim();
        if (!query || isLoading) return;

        const userMessage: Message = { role: "user", content: query };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);
        setError(null);

        try {
            const response = await chatWithHuggingFace(
                newMessages.map(m => ({ role: m.role, content: m.content })),
                apiKey || undefined,
                language
            );

            if (!response) throw new Error("No response from the advisor.");

            if (response.error) {
                setError(response.error);
            } else if (response.content) {
                setMessages(prev => [...prev, { role: "assistant", content: response.content as string }]);
            }
        } catch (err: any) {
            setError(err.message || "Failed to connect. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen max-h-screen p-4 md:p-6 max-w-4xl mx-auto gap-4">
            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500/10 rounded-2xl">
                        <Bot className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white">AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Advisor</span></h1>
                        <p className="text-xs text-slate-400 font-medium">Agricultural intelligence at your fingertips</p>
                    </div>
                </div>
            </div>

            {/* Chat Box */}
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col overflow-hidden min-h-0">
                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                    <AnimatePresence>
                        {messages.length === 0 && !isLoading && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center h-full py-16 text-center space-y-4 opacity-50"
                            >
                                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem]">
                                    <Sparkles className="h-10 w-10 text-emerald-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-700 dark:text-slate-300">{t("advisor.ready")}</h3>
                                    <p className="text-slate-400 font-medium mt-1 text-sm">Ask about your crops, soil, pests, or market prices.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {messages.map((m, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className={cn("flex gap-3", m.role === "user" ? "flex-row-reverse" : "flex-row")}
                        >
                            {/* Avatar */}
                            <div className={cn(
                                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                                m.role === "user" ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-emerald-600"
                            )}>
                                {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </div>

                            {/* Bubble */}
                            <div className={cn(
                                "max-w-[80%] px-5 py-3.5 rounded-2xl text-sm font-medium leading-relaxed space-y-1.5",
                                m.role === "user"
                                    ? "bg-emerald-600 text-white rounded-tr-sm"
                                    : "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-100 dark:border-slate-700"
                            )}>
                                {renderMessageContent(m.content)}
                            </div>
                        </motion.div>
                    ))}

                    {isLoading && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                <Loader2 className="h-4 w-4 text-emerald-500 animate-spin" />
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-5 py-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.3s]" />
                            </div>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-rose-500/10 text-rose-600 rounded-2xl border border-rose-500/20 flex items-center gap-3 text-sm font-bold">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            {error}
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick prompts */}
                <div className="px-5 pb-3 flex gap-2 flex-wrap border-t border-slate-50 dark:border-slate-800 pt-3">
                    {quickPrompts.map(p => (
                        <button
                            key={p}
                            onClick={() => handleSubmit(undefined, p)}
                            className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-emerald-500 hover:text-white transition-all border border-transparent hover:border-emerald-400/30"
                        >
                            {p}
                        </button>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
                        <input
                            id="advisor-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t("advisor.placeholder")}
                            className="flex-1 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm font-medium transition-all placeholder:text-slate-400"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            id="advisor-send"
                            disabled={!input.trim() || isLoading}
                            className="p-3.5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-600/20"
                        >
                            <Send className="h-5 w-5" />
                        </motion.button>
                    </form>
                </div>
            </div>
        </div>
    );
}
