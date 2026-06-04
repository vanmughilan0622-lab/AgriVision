"use server";

import OpenAI from "openai";

export async function analyzePlantImage(imageBase64: string, apiKey: string) {
    try {
        if (!apiKey) {
            return { error: "API Key is missing. Please configure it in Settings." };
        }

        const openai = new OpenAI({ apiKey });

        const prompt = `
      Analyze this plant image for diseases or health issues.
      Return a STRICT JSON object with the following structure:
      {
        "disease": "Name of the disease or 'Healthy'",
        "confidence": 0-100 (number),
        "description": "Brief explanation of the issue (2 sentences max)",
        "treatment": ["Step 1", "Step 2", "Step 3"] (array of strings, empty if healthy)
      }
      Return ONLY the JSON. No markdown formatting.
    `;

        // Remove header if present (e.g., "data:image/jpeg;base64,")
        const base64Data = imageBase64.split(",")[1] || imageBase64;
        const imageUrl = `data:image/jpeg;base64,${base64Data}`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageUrl,
                            },
                        },
                    ],
                },
            ],
            response_format: { type: "json_object" },
        });

        const text = response.choices[0]?.message?.content;
        if (!text) throw new Error("No response from OpenAI.");

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error("JSON Parse Error with OpenAI:", text);
            throw parseError;
        }

    } catch (error: any) {
        console.error("OpenAI Image Analysis Error:", error);

        const isAuthError =
            error.status === 401 ||
            error.status === 403 ||
            error.message?.toLowerCase().includes("invalid api key");

        if (isAuthError) {
            return { error: "Authentication failed. Please verify your OpenAI API Key." };
        }

        return { error: error.message || "An unexpected error occurred during image analysis." };
    }
}
