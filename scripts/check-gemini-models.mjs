import { GoogleGenAI } from "@google/genai";
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("--- Gemini Model Availability Checker (New SDK) ---");
console.log("This script will test which models are available for your API key.");

rl.question('Please enter your Gemini API Key: ', async (apiKey) => {
    if (!apiKey) {
        console.error("API Key is required.");
        rl.close();
        return;
    }

    const ai = new GoogleGenAI({ apiKey });

    // List of models to test
    const modelsToTest = [
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash",
        "gemini-1.5-flash-001",
        "gemini-1.5-pro",
        "gemini-pro"
    ];

    console.log("\n--- Listing Available Models via API ---");
    try {
        // Using direct REST API for listing as it is reliable for checking permissions
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        if (!response.ok) {
            console.error(`Failed to list models: ${response.status} ${response.statusText}`);
            const errText = await response.text();
            console.error(`Error details: ${errText}`);
        } else {
            const data = await response.json();
            if (data.models) {
                console.log("Found the following models explicitly supported for your key:");
                data.models.forEach(m => {
                    if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                        console.log(`- ${m.name.replace('models/', '')} (${m.displayName})`);
                    }
                });
            } else {
                console.log("No models returned by API.");
            }
        }
    } catch (e) {
        console.error("Error fetching model list:", e);
    }

    console.log("\nTesting specific models with @google/genai SDK...");

    for (const modelName of modelsToTest) {
        process.stdout.write(`Testing ${modelName.padEnd(25)} ... `);
        try {
            // New SDK way to generate content
            const result = await ai.models.generateContent({
                model: modelName,
                contents: [{ role: 'user', parts: [{ text: 'Test' }] }]
            });
            // Check if we got text back
            const text = result.text;
            if (text) {
                console.log(`✅ AVAILABLE`);
            } else {
                console.log(`⚠️  NO TEXT RETURNED`);
            }
        } catch (error) {
            // Check for 404 or other errors
            if (error.message && (error.message.includes("404") || error.message.includes("not found"))) {
                console.log(`❌ NOT FOUND (404)`);
            } else {
                console.log(`❌ ERROR: ${error.message ? error.message.split('\n')[0] : error}`);
            }
        }
    }

    console.log("\nDone.");
    rl.close();
});
