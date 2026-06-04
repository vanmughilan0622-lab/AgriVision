import { HfInference } from "@huggingface/inference";
import * as dotenv from "dotenv";

dotenv.config();

async function test() {
    console.log("Testing Hugging Face API Key...");
    try {
        const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
        const response = await hf.chatCompletion({
            model: "Qwen/Qwen2.5-7B-Instruct",
            messages: [{ role: "user", content: "Say hello!" }],
            max_tokens: 50
        });
        console.log("Success! API Response:", response.choices[0].message.content);
    } catch (e: any) {
        console.error("API Test Failed:", e.message);
    }
}

test();
