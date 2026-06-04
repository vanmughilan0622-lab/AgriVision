"use server";

import OpenAI from "openai";

export interface CropSuggestion {
    name: string;
    budget: string;
    duration: string;
    profit: string;
    description: string;
}

export async function getCropSuggestions(
    message: string,
    apiKey: string
) {
    try {
        if (!apiKey) {
            return { error: "API Key is missing. Please configure it in Settings." };
        }

        const openai = new OpenAI({ apiKey });

        const systemInstruction = "You are an expert crop advisor. Your goal is to help farmers maximize their profit by suggesting the best crops to grow for the current season and the upcoming season. Return a JSON object with a 'suggestions' key containing an array of crop objects. Each object MUST have: 'name' (string), 'budget' (string), 'duration' (string), 'profit' (string), and 'description' (string).";

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: message }
            ],
            response_format: { type: "json_object" },
        });

        const text = response.choices[0]?.message?.content;
        if (!text) throw new Error("No response from OpenAI.");

        try {
            const parsed = JSON.parse(text);
            if (!parsed.suggestions || !Array.isArray(parsed.suggestions)) {
                throw new Error("Invalid structure: missing 'suggestions' array.");
            }
            return { suggestions: parsed.suggestions as CropSuggestion[] };
        } catch (parseError) {
            console.error("JSON Parse Error with OpenAI:", text);
            throw parseError;
        }

    } catch (error: any) {
        console.error("OpenAI Crop Suggestion Error:", error);

        const isAuthError =
            error.status === 401 ||
            error.status === 403 ||
            error.message?.toLowerCase().includes("invalid api key");

        if (isAuthError) {
            return { error: "Authentication failed. Please verify your OpenAI API Key." };
        }

        return { error: error.message || "An unexpected error occurred during crop suggestions." };
    }
}
