"use server";

import { HfInference } from "@huggingface/inference";

export interface CropSuggestion {
    name: string;
    budget: string;
    duration: string;
    profit: string;
    description: string;
}

export async function getCropSuggestions(
    message: string,
    apiKey?: string
) {
    try {
        const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || apiKey);

        const systemInstruction = "You are an expert crop advisor. Based on the user's query, suggest the best crops to grow for maximum profit. Return ONLY a JSON object with a 'suggestions' array containing crop objects with name, budget, duration, profit, and description fields.";

        const messages = [
            { role: "system", content: systemInstruction },
            {
                role: "user",
                content: `${message}\n\nProvide 3-5 crop suggestions in JSON format with this structure:\n{\n  "suggestions": [\n    {\n      "name": "Crop Name",\n      "budget": "\u20b9X,XXX - \u20b9X,XXX",\n      "duration": "X-X months",\n      "profit": "\u20b9X,XXX/acre",\n      "description": "Brief description"\n    }\n  ]\n}\n\nReturn ONLY the JSON, no other text.`
            }
        ];

        const models = ["HuggingFaceH4/zephyr-7b-beta", "Qwen/Qwen2.5-7B-Instruct", "mistralai/Mistral-7B-Instruct-v0.3"];
        let lastError: any;
        let response: any;

        for (const model of models) {
            try {
                response = await hf.chatCompletion({
                    model,
                    messages: messages,
                    max_tokens: 1000,
                    temperature: 0.7,
                });
                if (response) break;
            } catch (err: any) {
                lastError = err;
                console.warn(`Crop model ${model} failed, trying next...`, err.message);
                if (!err.message?.includes("provider") && err.status !== 503) {
                    throw err;
                }
            }
        }

        if (!response) throw lastError;

        let text = response.choices[0]?.message?.content?.trim() || "";

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("No valid JSON found in response");
        }

        const parsed = JSON.parse(jsonMatch[0]);

        if (!parsed.suggestions || !Array.isArray(parsed.suggestions)) {
            throw new Error("Invalid structure: missing 'suggestions' array.");
        }

        // Validate each suggestion has required fields
        const validSuggestions = parsed.suggestions.filter((s: any) =>
            s.name && s.budget && s.duration && s.profit && s.description
        );

        if (validSuggestions.length === 0) {
            throw new Error("No valid suggestions found");
        }

        return { suggestions: validSuggestions as CropSuggestion[] };

    } catch (error: any) {
        console.error("Hugging Face Crop Suggestion Error:", error);

        const errorMessage = error.message || "";

        if (errorMessage.includes("rate limit") || error.status === 429) {
            return {
                error: "Rate limit reached. Please wait a moment or add your Hugging Face API key in Settings for unlimited access."
            };
        }

        const isAuthError =
            error.status === 401 ||
            error.status === 403;

        if (isAuthError) {
            return { error: "Authentication failed. Please verify your Hugging Face API Key." };
        }

        if (error.status === 503 || errorMessage.includes("loading")) {
            return { error: "Crop advisory services are currently busy. Please try again in 10-20 seconds." };
        }

        if (errorMessage.includes("provider")) {
            return { error: "The AI provider is experiencing temporary issues. We are retrying with alternative models. Please try again in a moment." };
        }

        return { error: errorMessage || "An unexpected error occurred during crop suggestions." };
    }
}
