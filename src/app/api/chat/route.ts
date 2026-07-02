import { NextRequest } from "next/server";
import { getDemoResponse } from "./demo-responses";

const languageNames: Record<string, string> = {
    en: "English", hi: "Hindi", ta: "Tamil", te: "Telugu",
    kn: "Kannada", mr: "Marathi", pa: "Punjabi", gu: "Gujarati",
    ml: "Malayalam",
};

export async function POST(req: NextRequest) {
    let lastUserMessage = "";
    let selectedLang = "en";
    try {
        const { history, language, context, apiKey } = await req.json();
        lastUserMessage = history?.filter((m: any) => m.role === "user").pop()?.content?.toLowerCase() || "";
        selectedLang = language || "en";


        if (!history || history.length === 0) {
            return new Response(JSON.stringify({ error: "No message history provided." }), { status: 400 });
        }

        const langName = languageNames[language || "en"] || "English";
        const systemPrompt = `You are a friendly and expert agricultural advisor helping Indian farmers. Provide concise, practical, conversational advice about crops, plant diseases, weather impact, yield optimization, soil, fertilizers, irrigation, and farming tips. Write in plain conversational sentences. Do NOT use any markdown formatting such as asterisks (**), hash symbols (#), bullet dashes (-), underscores, or backticks. Do NOT use bold or italic text. Use simple numbered lists only when listing steps. Keep answers helpful for small to medium scale farmers. Always respond only in ${langName}. CRITICAL INSTRUCTION: You MUST use the native script for ${langName} (e.g., use the actual Tamil alphabet for Tamil, Devanagari for Hindi). DO NOT use Latin/English transliteration (e.g., no Tanglish or Hinglish). ${context ? `\nContext regarding farmer's recent crop scan: ${context}` : ""}`;

        const langInstruction = language && language !== "en"
            ? ` (Please reply strictly in ${langName} using its native script/alphabet. Do NOT transliterate into English letters.)`
            : "";

        const hfToken = apiKey || process.env.HUGGINGFACE_TOKEN;
        
        if (!hfToken) {
            return new Response(JSON.stringify({ error: "Hugging Face Token is missing. Please add it in settings." }), { status: 401 });
        }

        const contents = history.map((msg: any, idx: number) => {
            const content = idx === history.length - 1 && msg.role === "user"
                ? msg.content + langInstruction
                : msg.content;
            return {
                role: msg.role === "user" ? "user" : "assistant",
                content: content
            };
        });

        const messages = [
            { role: "system", content: systemPrompt },
            ...contents
        ];

        const payload = {
            model: "mistralai/Mistral-7B-Instruct-v0.3",
            messages: messages,
            stream: true,
            temperature: 0.7
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
            throw new Error(`Hugging Face API error: ${response.status} ${err}`);
        }

        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
            async start(controller) {
                const reader = response.body?.getReader();
                if (!reader) {
                    controller.close();
                    return;
                }
                const decoder = new TextDecoder();
                let buffer = "";

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        
                        buffer += decoder.decode(value, { stream: true });
                        const lines = buffer.split('\n');
                        buffer = lines.pop() || ""; 

                        for (const line of lines) {
                            if (line.trim().startsWith("data: ")) {
                                const dataStr = line.replace(/^data:\s*/, "").trim();
                                if (dataStr === "[DONE]") continue;
                                try {
                                    const json = JSON.parse(dataStr);
                                    if (json.choices?.[0]?.delta?.content) {
                                        controller.enqueue(encoder.encode(json.choices[0].delta.content));
                                    }
                                } catch (e) {
                                    // Ignore parse errors for incomplete JSON
                                }
                            }
                        }
                    }
                    controller.close();
                } catch (e: any) {
                    console.error("Stream Error:", e);
                    controller.enqueue(encoder.encode(`\n\n**API Error**: ${e.message || "Failed to generate response."}`));
                    controller.close();
                }
            }
        });

        return new Response(readableStream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
            },
        });
    } catch (error: any) {
        console.error("AI API Error:", error);
        
        // Hackathon Demo Fallback: Stream a context-aware multilingual response if offline
        const demoMessage = getDemoResponse(lastUserMessage, selectedLang);

        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
            async start(controller) {
                const words = demoMessage.split(" ");
                for (const word of words) {
                    controller.enqueue(encoder.encode(word + " "));
                    await new Promise(r => setTimeout(r, 40));
                }
                controller.close();
            }
        });

        return new Response(readableStream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
            },
        });
    }
}
