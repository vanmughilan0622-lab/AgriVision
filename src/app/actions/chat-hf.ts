"use server";

import { HfInference } from "@huggingface/inference";

const languageNames: Record<string, string> = {
    en: "English",
    hi: "Hindi",
    ta: "Tamil",
    te: "Telugu",
    kn: "Kannada",
    mr: "Marathi",
    pa: "Punjabi",
    gu: "Gujarati",
    ml: "Malayalam",
};

function cleanMarkdown(text: string): string {
    return text
        .replace(/#{1,6}\s?/g, "")
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/__(.+?)__/g, "$1")
        .replace(/_(.+?)_/g, "$1")
        .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, "").trim())
        .replace(/^\s*[-*+]\s+/gm, "• ")
        .replace(/^\s*\d+\.\s+/gm, (m) => m.trim() + " ")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

export async function chatWithHuggingFace(
    history: { role: "user" | "assistant"; content: string }[],
    apiKey?: string,
    language?: string,
    context?: string
) {
    try {
        // Hugging Face API key is optional - can use free inference API
        const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || apiKey);

        if (history.length === 0) {
            return { error: "No message history provided." };
        }

        const langName = languageNames[language || "en"] || "English";
        const systemPrompt = `You are a friendly and expert agricultural advisor helping Indian farmers. Provide concise, practical, conversational advice about crops, plant diseases, weather impact, yield optimization, soil, fertilizers, irrigation, and farming tips. Write in plain conversational sentences. Do NOT use any markdown formatting such as asterisks (**), hash symbols (#), bullet dashes (-), underscores, or backticks. Do NOT use bold or italic text. Use simple numbered lists only when listing steps. Keep answers helpful for small to medium scale farmers. Always respond only in ${langName}. ${context ? `\nContext regarding farmer's recent crop scan: ${context}` : ""}`;

        const langInstruction = language && language !== "en"
            ? ` (Please reply in ${langName} only)`
            : "";

        const formattedHistory = history.map((msg, idx) => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: idx === history.length - 1 && msg.role === "user"
                ? msg.content + langInstruction
                : msg.content
        }));

        const messages = [
            { role: "system", content: systemPrompt },
            ...formattedHistory
        ];

        const models = ["HuggingFaceH4/zephyr-7b-beta", "Qwen/Qwen2.5-7B-Instruct", "mistralai/Mistral-7B-Instruct-v0.3"];
        let lastError: any;
        let response: any;

        for (const model of models) {
            try {
                response = await hf.chatCompletion({
                    model,
                    messages: messages,
                    max_tokens: 500,
                    temperature: 0.7,
                });
                if (response) break;
            } catch (err: any) {
                lastError = err;
                console.warn(`Chat model ${model} failed, trying next...`, err.message);
                if (!err.message?.includes("provider") && err.status !== 503) {
                    throw err;
                }
            }
        }

        if (!response) throw lastError;

        const raw = response.choices[0]?.message?.content?.trim();

        if (!raw) {
            throw new Error("No response text received from Hugging Face.");
        }

        return { content: cleanMarkdown(raw) };

    } catch (error: any) {
        console.error("Hugging Face Chat Error:", error);

        const errorMessage = error.message || "";

        // Check for rate limiting (free tier)
        if (errorMessage.includes("rate limit") || error.status === 429) {
            return {
                error: "Rate limit reached. Please wait a moment or add your Hugging Face API key in Settings for unlimited access."
            };
        }

        const isAuthError =
            error.status === 401 ||
            error.status === 403 ||
            errorMessage.toLowerCase().includes("invalid api key");

        if (isAuthError) {
            return { error: "Authentication failed. Please verify your Hugging Face API Key in Settings." };
        }

        if (error.status === 503 || errorMessage.includes("loading")) {
            return { error: "AI services are currently busy. Please try again in a few seconds." };
        }

        if (errorMessage.includes("provider")) {
            return { error: "The AI provider is experiencing temporary issues. We are retrying with alternative models. Please try again in a moment." };
        }

        return { error: errorMessage || "An unexpected error occurred." };
    }
}
