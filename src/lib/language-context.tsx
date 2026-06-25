"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { T, LANGUAGES } from "@/lib/i18n";
import type { LangCode } from "@/lib/i18n";

interface LanguageContextValue {
    lang: LangCode;
    setLang: (l: LangCode) => void;
    t: (key: string) => string;
    languages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextValue>({
    lang: "en",
    setLang: () => { },
    t: (k) => k,
    languages: LANGUAGES,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<LangCode>("en");

    useEffect(() => {
        const saved = localStorage.getItem("preferred_language") as LangCode | null;
        if (saved && LANGUAGES.some((l) => l.code === saved)) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLangState(saved);
        }
    }, []);

    const setLang = (l: LangCode) => {
        setLangState(l);
        localStorage.setItem("preferred_language", l);
    };

    const t = (key: string): string => {
        const entry = T[key];
        if (!entry) return key;
        return entry[lang] || entry["en"] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, languages: LANGUAGES }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
