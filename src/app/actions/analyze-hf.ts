"use server";

import { HfInference } from "@huggingface/inference";

export async function analyzePlantImage(imageBase64: string, apiKey?: string) {
    try {
        const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || apiKey);

        const base64Data = imageBase64.split(",")[1] || imageBase64;

        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: "image/jpeg" });

        let classificationResult;
        const visionModels = [
            "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification",
            "ozair23/mobilenet_v2_1.0_224-finetuned-plantdisease",
            "wambugu71/crop_leaf_diseases_vit"
        ];

        let visionError;
        for (const model of visionModels) {
            try {
                classificationResult = await hf.imageClassification({
                    model,
                    data: blob,
                });
                if (classificationResult) break;
            } catch (err: any) {
                visionError = err;
                console.warn(`Vision model ${model} failed, trying next...`);
            }
        }

        if (!classificationResult) {
            console.warn("All vision models unavailable:", visionError);
            return {
                disease: "Analysis Unavailable",
                confidence: 0,
                description: "Image analysis is temporarily unavailable. The vision models may be loading or rate-limited. Please try again in a few moments.",
                treatment: [
                    "Wait 10–20 seconds and try again",
                    "Ensure image is clear and well-lit",
                    "Consider adding a Hugging Face API key in Settings for better availability"
                ]
            };
        }

        const topClass = classificationResult[0];
        const rawLabel = topClass?.label || "unknown plant";
        // Sanitize label for LLM: "Tomato___Leaf_Mold" -> "Tomato Leaf Mold"
        const imageDescription = rawLabel.replace(/[_-]+/g, " ").trim();
        const confidence = Math.round((topClass?.score || 0.5) * 100);

        const prompt = `The plant image has been classified as: "${imageDescription}".

As an expert plant pathologist, analyze this classification and provide a detailed diagnosis. 
If the classification mentions a specific disease (e.g., 'Tomato Late blight'), explain that disease. 
If it says 'Healthy', confirm the plant's health.

Return ONLY a JSON object with this exact structure:
{
  "disease": "Name of the disease (or 'Healthy')",
  "confidence": ${confidence},
  "description": "2-3 sentences explaining the issue or health status in plain text. No markdown.",
  "treatment": ["Plain text step 1", "Plain text step 2", "Plain text step 3"]
}

Return ONLY the JSON object, no other text, no markdown, no asterisks.`;

        const messages = [
            {
                role: "system" as const,
                content: "You are an expert plant pathologist. You provide accurate medical-grade plant diagnosis based on vision labels. Keep responses conversational, helpful, and strictly in plain text without any markdown or special formatting."
            },
            {
                role: "user" as const,
                content: prompt
            }
        ];

        const models = ["HuggingFaceH4/zephyr-7b-beta", "Qwen/Qwen2.5-7B-Instruct", "mistralai/Mistral-7B-Instruct-v0.3"];
        let lastError: any;
        let response: any;

        for (const model of models) {
            try {
                response = await hf.chatCompletion({
                    model,
                    messages,
                    max_tokens: 400,
                    temperature: 0.3,
                });
                if (response) break;
            } catch (err: any) {
                lastError = err;
                console.warn(`Model ${model} failed, trying next...`, err.message);
                if (!err.message?.includes("provider") && err.status !== 503) {
                    throw err; // If it's not a provider/busy error, don't fallback
                }
            }
        }

        if (!response) throw lastError;

        let text = response.choices[0]?.message?.content?.trim() || "";

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return {
                disease: imageDescription.includes("healthy") ? "Healthy" : "Potential Issue Detected",
                confidence,
                description: `The plant appears to be classified as ${imageDescription}. For a more accurate diagnosis, ensure the image clearly shows any affected areas with good lighting.`,
                treatment: [
                    "Take a clearer, well-lit photo",
                    "Focus on the affected leaf or stem area",
                    "Try again with better image quality"
                ]
            };
        }

        const parsed = JSON.parse(jsonMatch[0]);

        if (!parsed.disease || typeof parsed.confidence !== "number" || !parsed.description || !Array.isArray(parsed.treatment)) {
            throw new Error("Invalid response structure from model");
        }

        return parsed;

    } catch (error: any) {
        console.error("Hugging Face Image Analysis Error:", error);

        const errorMessage = error.message || "";
        
        if (errorMessage.includes("rate limit") || error.status === 429) {
            return {
                error: "Rate limit reached. Please wait a moment or add your Hugging Face API key in Settings."
            };
        }

        if (error.status === 401 || error.status === 403) {
            return { error: "Authentication failed. Please verify your Hugging Face API Key in Settings." };
        }

        if (error.status === 503 || errorMessage.includes("loading")) {
            return { error: "Models are currently busy. Please try again in 10–20 seconds." };
        }

        if (errorMessage.includes("provider")) {
            return { error: "Hugging Face is currently experiencing high load. Please try again in a moment or add an API key in Settings for priority access." };
        }

        return { error: errorMessage || "An unexpected error occurred during image analysis." };
    }
}
