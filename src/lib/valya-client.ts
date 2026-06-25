export async function chatWithValya(prompt: string, imageBase64?: string, model: string = "phi3.5"): Promise<string> {
    try {
        const payload = {
            model: model,
            messages: [{ role: "user", content: prompt }],
            stream: false,
            options: {
                num_ctx: 4096
            }
        };

        const response = await fetch("http://127.0.0.1:11434/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Ollama API Error: ${response.status} ${err}`);
        }

        const data = await response.json();
        return data.message.content;
    } catch (error: any) {
        console.error("Failed to connect to Valya AI Agent:", error);
        throw error;
    }
}
