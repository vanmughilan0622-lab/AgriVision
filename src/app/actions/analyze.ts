"use server";

import { chatWithValya } from "@/lib/valya-client";

export async function analyzePlantImage(imageBase64: string, apiKey: string) {
    try {
        const geminiApiKey = apiKey || process.env.GEMINI_API_KEY;
        if (!geminiApiKey) {
            return { error: "API Key is missing. Please configure your Gemini API Key in Settings." };
        }

        const prompt = `
      Analyze this plant image for diseases or health issues.
      Return a STRICT JSON object with the following structure:
      {
        "disease": "Name of the disease or 'Healthy'",
        "confidence": 95,
        "description": "Brief explanation of the issue (2 sentences max)",
        "treatment": ["Step 1", "Step 2", "Step 3"]
      }
      Return ONLY the JSON. No markdown formatting.
    `;

        const base64Data = imageBase64.split(",")[1] || imageBase64;

        // Use the passed API Key directly with chatWithValya override
        const responseText = await chatWithValya(prompt, base64Data, "gemini-2.5-flash", geminiApiKey);
        
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("No valid JSON found in response");
        }

        const parsed = JSON.parse(jsonMatch[0]);

        if (!parsed.disease || typeof parsed.confidence !== "number" || !parsed.description || !Array.isArray(parsed.treatment)) {
            throw new Error("Invalid response structure from Gemini API");
        }

        return parsed;

    } catch (error: any) {
        console.error("Gemini Vision Analysis Error:", error);
        return { error: "Failed to process image with Gemini Vision API." };
    }
}
