"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    MessageCircle,
    ThumbsUp,
    ShieldCheck,
    Search,
    Plus,
    X,
    ChevronDown,
    ChevronUp,
    Globe2,
    Send,
    Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

const languages: { code: string; label: string }[] = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "ta", label: "தமிழ்" },
    { code: "te", label: "తెలుగు" },
    { code: "kn", label: "ಕನ್ನಡ" },
    { code: "mr", label: "मराठी" },
    { code: "pa", label: "ਪੰਜਾਬੀ" },
    { code: "gu", label: "ગુજરાતી" },
];

interface Answer {
    id: number;
    author: string;
    role: string;
    text: string;
    upvotes: number;
    isExpert: boolean;
    userUpvoted: boolean;
}

interface Question {
    id: number;
    title: string;
    body: string;
    tags: string[];
    author: string;
    language: string;
    upvotes: number;
    userUpvoted: boolean;
    answers: Answer[];
    expanded: boolean;
    showAnswerBox: boolean;
}

const initialQuestions: Question[] = [
    {
        id: 1,
        title: "My tomato leaves are turning yellow at the bottom — what's wrong?",
        body: "Started 2 weeks ago. The lower leaves are yellowing and falling. Top growth looks fine. Soil seems moist.",
        tags: ["tomato", "disease", "leaf"],
        author: "Ravi Kumar",
        language: "en",
        upvotes: 14,
        userUpvoted: false,
        expanded: true,
        showAnswerBox: false,
        answers: [
            {
                id: 1,
                author: "Dr. Anita Patel",
                role: "Plant Pathologist",
                text: "This is classic Early Blight (Alternaria solani). Remove affected leaves, avoid overhead irrigation, and spray Mancozeb 75 WP @ 2 g/L every 7 days for 3 applications.",
                upvotes: 9,
                isExpert: true,
                userUpvoted: false,
            },
        ],
    },
    {
        id: 2,
        title: "गेहूं में दीमक की समस्या — क्या करें?",
        body: "मेरे खेत में गेहूं की जड़ें दीमक खा रहे हैं। बहुत नुकसान हो रहा है।",
        tags: ["wheat", "termite", "soil"],
        author: "Suresh Yadav",
        language: "hi",
        upvotes: 8,
        userUpvoted: false,
        expanded: false,
        showAnswerBox: false,
        answers: [
            {
                id: 1,
                author: "KVK Expert",
                role: "Agricultural Officer",
                text: "बुवाई से पहले क्लोरपायरीफॉस 20 EC @ 4 L/ha को मिट्टी में मिलाएं। साथ ही जैविक नियंत्रण के लिए Metarhizium anisopliae का उपयोग करें।",
                upvotes: 6,
                isExpert: true,
                userUpvoted: false,
            },
        ],
    },
    {
        id: 3,
        title: "Best irrigation schedule for drip-irrigated cotton in sandy soil?",
        body: "My cotton is on sandy loam with drip lines. Current schedule is every day. Am I over-irrigating?",
        tags: ["cotton", "irrigation", "drip"],
        author: "Meera S.",
        language: "en",
        upvotes: 5,
        userUpvoted: false,
        expanded: false,
        showAnswerBox: false,
        answers: [],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } as const },
};

export default function CommunityPage() {
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [search, setSearch] = useState("");
    const [langFilter, setLangFilter] = useState("all");
    const [showAskModal, setShowAskModal] = useState(false);
    const [newQ, setNewQ] = useState({ title: "", body: "", tags: "", language: "en" });
    const [answerInputs, setAnswerInputs] = useState<Record<number, string>>({});

    const filtered = questions.filter((q) => {
        const matchSearch =
            q.title.toLowerCase().includes(search.toLowerCase()) ||
            q.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
        const matchLang = langFilter === "all" || q.language === langFilter;
        return matchSearch && matchLang;
    });

    const toggleExpand = (id: number) => {
        setQuestions((prev) => prev.map((q) => q.id === id ? { ...q, expanded: !q.expanded } : q));
    };

    const toggleAnswerBox = (id: number) => {
        setQuestions((prev) => prev.map((q) => q.id === id ? { ...q, showAnswerBox: !q.showAnswerBox } : q));
    };

    const upvoteQuestion = (id: number) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === id
                    ? { ...q, upvotes: q.userUpvoted ? q.upvotes - 1 : q.upvotes + 1, userUpvoted: !q.userUpvoted }
                    : q
            )
        );
    };

    const upvoteAnswer = (qId: number, aId: number) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === qId
                    ? {
                        ...q,
                        answers: q.answers.map((a) =>
                            a.id === aId
                                ? { ...a, upvotes: a.userUpvoted ? a.upvotes - 1 : a.upvotes + 1, userUpvoted: !a.userUpvoted }
                                : a
                        ),
                    }
                    : q
            )
        );
    };

    const submitAnswer = (qId: number) => {
        const text = (answerInputs[qId] || "").trim();
        if (!text) return;
        const newAnswer: Answer = {
            id: Date.now(),
            author: "You",
            role: "Community Member",
            text,
            upvotes: 0,
            isExpert: false,
            userUpvoted: false,
        };
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === qId ? { ...q, answers: [...q.answers, newAnswer], showAnswerBox: false } : q
            )
        );
        setAnswerInputs((prev) => ({ ...prev, [qId]: "" }));
    };

    const submitQuestion = () => {
        if (!newQ.title.trim() || !newQ.body.trim()) return;
        const q: Question = {
            id: Date.now(),
            title: newQ.title,
            body: newQ.body,
            tags: newQ.tags.split(",").map((t) => t.trim()).filter(Boolean),
            author: "You",
            language: newQ.language,
            upvotes: 0,
            userUpvoted: false,
            expanded: true,
            showAnswerBox: false,
            answers: [],
        };
        setQuestions((prev) => [q, ...prev]);
        setNewQ({ title: "", body: "", tags: "", language: "en" });
        setShowAskModal(false);
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="p-3 bg-blue-500/10 rounded-2xl">
                            <Users className="h-9 w-9 text-blue-600" />
                        </div>
                        Community{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-400">
                            Q&amp;A
                        </span>
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                        Ask, share, and learn from farmers and agricultural experts in your language.
                    </p>
                </div>
                <motion.button
                    id="ask-question-btn"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowAskModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-colors shrink-0"
                >
                    <Plus className="h-5 w-5" />
                    Ask Question
                </motion.button>
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        id="community-search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search questions or tags..."
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium"
                    />
                </div>
                <div className="relative">
                    <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select
                        id="language-filter"
                        value={langFilter}
                        onChange={(e) => setLangFilter(e.target.value)}
                        className="pl-11 pr-8 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold appearance-none cursor-pointer"
                    >
                        <option value="all">All Languages</option>
                        {languages.map((l) => (
                            <option key={l.code} value={l.code}>{l.label}</option>
                        ))}
                    </select>
                </div>
            </motion.div>

            {/* Questions List */}
            <div className="space-y-5">
                <AnimatePresence>
                    {filtered.map((q) => (
                        <motion.div
                            key={q.id}
                            variants={itemVariants}
                            layout
                            className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden"
                        >
                            {/* Question Header */}
                            <div className="p-6 md:p-8">
                                <div className="flex items-start gap-4">
                                    {/* Upvote */}
                                    <div className="flex flex-col items-center gap-1 shrink-0">
                                        <button
                                            id={`upvote-q-${q.id}`}
                                            onClick={() => upvoteQuestion(q.id)}
                                            className={cn(
                                                "p-2 rounded-xl transition-all",
                                                q.userUpvoted ? "bg-emerald-500/10 text-emerald-600" : "text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/5"
                                            )}
                                        >
                                            <ThumbsUp className="h-5 w-5" />
                                        </button>
                                        <span className="text-xs font-black text-slate-700 dark:text-slate-300">{q.upvotes}</span>
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <button
                                            id={`expand-q-${q.id}`}
                                            onClick={() => toggleExpand(q.id)}
                                            className="text-left w-full"
                                        >
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                                                {q.title}
                                            </h3>
                                        </button>

                                        <div className="flex flex-wrap items-center gap-2">
                                            {q.tags.map((tag) => (
                                                <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500">
                                                    <Tag className="h-2.5 w-2.5" />
                                                    {tag}
                                                </span>
                                            ))}
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-600 border border-blue-500/20">
                                                {languages.find((l) => l.code === q.language)?.label || q.language}
                                            </span>
                                        </div>

                                        <p className="text-xs text-slate-400 font-medium">Asked by <span className="font-bold text-slate-600 dark:text-slate-300">{q.author}</span></p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="flex items-center gap-1.5 text-xs font-black text-slate-400">
                                            <MessageCircle className="h-4 w-4" />
                                            {q.answers.length}
                                        </span>
                                        <button onClick={() => toggleExpand(q.id)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400">
                                            {q.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded content */}
                            <AnimatePresence>
                                {q.expanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-2 border-t border-slate-100 dark:border-slate-800">
                                            <p className="py-4 text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{q.body}</p>
                                        </div>

                                        {/* Answers */}
                                        {q.answers.length > 0 && (
                                            <div className="px-8 space-y-4 pb-4">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    {q.answers.length} Answer{q.answers.length !== 1 ? "s" : ""}
                                                </p>
                                                {q.answers.map((a) => (
                                                    <div key={a.id} className={cn("flex gap-4 p-5 rounded-2xl border", a.isExpert ? "bg-emerald-500/5 border-emerald-500/20" : "bg-slate-50 dark:bg-slate-950/50 border-slate-100 dark:border-slate-800")}>
                                                        <div className="flex flex-col items-center gap-1 shrink-0">
                                                            <button
                                                                id={`upvote-a-${a.id}`}
                                                                onClick={() => upvoteAnswer(q.id, a.id)}
                                                                className={cn("p-1.5 rounded-xl transition-all", a.userUpvoted ? "text-emerald-600 bg-emerald-500/10" : "text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/5")}
                                                            >
                                                                <ThumbsUp className="h-4 w-4" />
                                                            </button>
                                                            <span className="text-xs font-black text-slate-600 dark:text-slate-300">{a.upvotes}</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span className="text-sm font-black text-slate-900 dark:text-white">{a.author}</span>
                                                                {a.isExpert && (
                                                                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                                                                        <ShieldCheck className="h-2.5 w-2.5" />
                                                                        Expert · {a.role}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{a.text}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Answer input toggle */}
                                        <div className="px-8 pb-6">
                                            {!q.showAnswerBox ? (
                                                <button
                                                    id={`reply-btn-${q.id}`}
                                                    onClick={() => toggleAnswerBox(q.id)}
                                                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-500 transition-colors"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add Answer
                                                </button>
                                            ) : (
                                                <div className="space-y-3">
                                                    <textarea
                                                        id={`answer-input-${q.id}`}
                                                        value={answerInputs[q.id] || ""}
                                                        onChange={(e) => setAnswerInputs((prev) => ({ ...prev, [q.id]: e.target.value }))}
                                                        placeholder="Write your answer here..."
                                                        rows={3}
                                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium resize-none"
                                                    />
                                                    <div className="flex gap-2">
                                                        <button
                                                            id={`submit-answer-${q.id}`}
                                                            onClick={() => submitAnswer(q.id)}
                                                            className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black hover:bg-emerald-500 transition-colors"
                                                        >
                                                            <Send className="h-3.5 w-3.5" />
                                                            Post Answer
                                                        </button>
                                                        <button
                                                            onClick={() => toggleAnswerBox(q.id)}
                                                            className="px-4 py-2 rounded-xl text-xs font-black text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Ask Question Modal */}
            <AnimatePresence>
                {showAskModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-lg p-8 space-y-6"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Ask a Question</h2>
                                <button
                                    id="close-ask-modal"
                                    onClick={() => setShowAskModal(false)}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Title</label>
                                    <input
                                        id="new-question-title"
                                        value={newQ.title}
                                        onChange={(e) => setNewQ((p) => ({ ...p, title: e.target.value }))}
                                        placeholder="What's your farming question?"
                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Details</label>
                                    <textarea
                                        id="new-question-body"
                                        value={newQ.body}
                                        onChange={(e) => setNewQ((p) => ({ ...p, body: e.target.value }))}
                                        placeholder="Describe your problem in detail..."
                                        rows={4}
                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Tags (comma separated)</label>
                                        <input
                                            id="new-question-tags"
                                            value={newQ.tags}
                                            onChange={(e) => setNewQ((p) => ({ ...p, tags: e.target.value }))}
                                            placeholder="wheat, pest, soil"
                                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Language</label>
                                        <select
                                            id="new-question-language"
                                            value={newQ.language}
                                            onChange={(e) => setNewQ((p) => ({ ...p, language: e.target.value }))}
                                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold appearance-none"
                                        >
                                            {languages.map((l) => (
                                                <option key={l.code} value={l.code}>{l.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                id="submit-question-btn"
                                onClick={submitQuestion}
                                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20"
                            >
                                Post Question
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
