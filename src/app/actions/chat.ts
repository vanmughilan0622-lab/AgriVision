"use server";

import OpenAI from "openai";

export async function chatWithGemini(
    history: { role: "user" | "assistant"; content: string }[],
    apiKey: string
) {
    try {
        if (!apiKey) {
            return { error: "API Key is missing. Please configure it in Settings." };
        }

        const openai = new OpenAI({ apiKey });

        if (history.length === 0) {
            return { error: "No message history provided." };
        }

        const systemInstruction = "You are an expert agricultural advisor helping a farmer. Provide concise, practical, and accurate advice about crops, plant diseases, weather impact, yield optimization, and general farming tips. Keep answers helpful for small to medium scale farmers.";

        const messages: any[] = [
            { role: "system", content: systemInstruction },
            ...history
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            max_tokens: 1000,
        });

        const text = response.choices[0]?.message?.content;

        if (!text) {
            throw new Error("No response text received from OpenAI.");
        }

        return { content: text };

    } catch (error: any) {
        console.error("OpenAI Chat Error:", error);

        const isAuthError =
            error.status === 401 ||
            error.status === 403 ||
            error.message?.toLowerCase().includes("invalid api key") ||
            error.message?.toLowerCase().includes("incorrect api key");

        if (isAuthError) {
            return { error: "Authentication failed. Please verify your OpenAI API Key in Settings." };
        }

        if (error.status === 404) {
            return { error: "Model availability error. The requested OpenAI model might be unavailable for your account." };
        }

        return { error: error.message || "An unexpected error occurred." };
    }
}
