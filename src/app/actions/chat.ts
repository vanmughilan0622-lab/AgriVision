"use server";

export async function chatWithGemini(
    history: { role: "user" | "assistant"; content: string }[],
    apiKey: string
) {
    try {
        const hfToken = apiKey || process.env.HUGGINGFACE_TOKEN;
        if (!hfToken) {
            return { error: "Token is missing. Please configure your Hugging Face Token in Settings." };
        }

        if (history.length === 0) {
            return { error: "No message history provided." };
        }

        const systemInstruction = "You are an expert agricultural advisor helping a farmer. Provide concise, practical, and accurate advice about crops, plant diseases, weather impact, yield optimization, and general farming tips. Keep answers helpful for small to medium scale farmers.";

        const messages: any[] = [
            { role: "system", content: systemInstruction },
            ...history
        ];

        const payload = {
            model: "mistralai/Mistral-7B-Instruct-v0.3",
            messages: messages,
            max_tokens: 1000,
        };

        const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${hfToken}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Hugging Face API Error: ${response.status} ${err}`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;

        if (!text) {
            throw new Error("No response text received from Hugging Face.");
        }

        return { content: text };

    } catch (error: any) {
        console.error("Hugging Face Chat Error:", error);

        const isAuthError =
            error.status === 401 ||
            error.status === 403 ||
            error.message?.toLowerCase().includes("unauthorized") ||
            error.message?.toLowerCase().includes("invalid api key") ||
            error.message?.toLowerCase().includes("authentication failed");

        if (isAuthError) {
            return { error: "Authentication failed. Please verify your Hugging Face Token in Settings." };
        }

        if (error.status === 404) {
            return { error: "Model availability error. The requested model might be unavailable." };
        }

        return { error: error.message || "An unexpected error occurred." };
    }
}
