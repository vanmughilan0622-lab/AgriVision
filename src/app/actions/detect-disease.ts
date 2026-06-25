"use server";

import { prisma as db } from "@/lib/db";
import { getDefaultUserId } from "@/lib/auth";
import fs from 'fs';
import path from 'path';
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || undefined);

/**
 * Step 1: Classify the image using a free HF image-classification model.
 * Returns the top predicted disease label and confidence score.
 */
async function classifyPlantImage(imageData: Buffer): Promise<{ label: string; score: number }[]> {
  const classificationModels = [
    "Dima806/plant_diseases_image_detection",
    "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification",
    "ozair23/mobilenet_v2_1.0_224-finetuned-plantdisease",
  ];

  const blob = new Blob([imageData as unknown as ArrayBuffer], { type: "image/jpeg" });

  for (const model of classificationModels) {
    try {
      const result = await hf.imageClassification({
        model,
        data: blob,
      });
      if (result && result.length > 0) {
        return result.slice(0, 3).map(r => ({
          label: r.label,
          score: Math.round(r.score * 100),
        }));
      }
    } catch (err: any) {
      console.warn(`Image classification model ${model} failed:`, err.message);
    }
  }

  // Fallback: return generic unknown
  return [{ label: "Unknown", score: 50 }];
}

/**
 * Step 2: Use a free HF text LLM to generate a full structured JSON analysis
 * based on the classification labels from Step 1.
 */
async function generateDiseaseAnalysis(classifications: { label: string; score: number }[]): Promise<string> {
  const topResult = classifications[0];
  const isHealthy = topResult.label.toLowerCase().includes("healthy");

  const prompt = `You are an expert agronomist AI. A plant disease image classifier has identified the following:
- Top prediction: "${topResult.label}" with ${topResult.score}% confidence
${classifications[1] ? `- 2nd prediction: "${classifications[1].label}" with ${classifications[1].score}% confidence` : ""}
${classifications[2] ? `- 3rd prediction: "${classifications[2].label}" with ${classifications[2].score}% confidence` : ""}

Based on this diagnosis, return ONLY a raw JSON object (no markdown, no backticks, no extra text):
{
  "diseaseName": "${isHealthy ? "Healthy" : topResult.label.replace(/_/g, ' ')}",
  "confidenceScore": ${topResult.score},
  "description": "2-3 sentences describing the visual symptoms of this condition",
  "explainability": "Why this diagnosis was made based on the classifier output and known disease symptoms",
  "riskMetrics": { "diseaseRisk": 0, "spreadRisk": 0, "waterStress": 0, "pestRisk": 0 },
  "recommendedTreatment": "Specific actionable treatment in 2-3 sentences",
  "preventionTips": "2-3 prevention tips",
  "tasks": [
    { "title": "First action", "description": "Details", "dueDays": 1, "category": "Disease" },
    { "title": "Follow-up", "description": "Details", "dueDays": 7, "category": "Disease" }
  ]
}`;

  const textModels = [
    "Qwen/Qwen2.5-72B-Instruct",
    "Qwen/Qwen2.5-7B-Instruct",
    "mistralai/Mixtral-8x7B-Instruct-v0.1",
    "meta-llama/Meta-Llama-3-8B-Instruct",
  ];

  for (const model of textModels) {
    try {
      const response = await hf.chatCompletion({
        model,
        messages: [
          { role: "system", content: "You are a precise JSON-generating agronomist AI. Output only valid raw JSON, no markdown, no explanation." },
          { role: "user", content: prompt },
        ],
        max_tokens: 700,
        temperature: 0.2,
      });
      const text = response.choices[0]?.message?.content?.trim();
      if (text) return text;
    } catch (err: any) {
      console.warn(`Text model ${model} failed:`, err.message);
    }
  }

  // Fallback: build a basic JSON directly from classification result
  return JSON.stringify({
    diseaseName: isHealthy ? "Healthy" : topResult.label.replace(/_/g, ' '),
    confidenceScore: topResult.score,
    description: isHealthy
      ? "The crop appears healthy with no visible signs of disease."
      : `The crop shows signs of ${topResult.label.replace(/_/g, ' ')}. Inspect the leaves for discolouration and lesions.`,
    explainability: `Image classifier identified "${topResult.label}" at ${topResult.score}% confidence.`,
    riskMetrics: {
      diseaseRisk: isHealthy ? 5 : topResult.score,
      spreadRisk: isHealthy ? 5 : Math.round(topResult.score * 0.7),
      waterStress: 20,
      pestRisk: 15,
    },
    recommendedTreatment: isHealthy
      ? "No treatment needed. Continue regular monitoring."
      : "Apply appropriate fungicide or pesticide. Consult a local agronomist for confirmation.",
    preventionTips: "Rotate crops regularly. Ensure proper drainage and avoid overhead irrigation.",
    tasks: [
      { title: "Inspect crop closely", description: "Walk the field and check for spread.", dueDays: 1, category: "Disease" },
      { title: "Follow-up monitoring", description: "Check response to treatment.", dueDays: 7, category: "Disease" },
    ],
  });
}

export async function detectDiseaseFromImage(formData: FormData) {
  const image = formData.get("image") as File;
  if (!image) {
    return { success: false, error: "No image provided" };
  }

  const userId = await getDefaultUserId();

  try {
    const imageBuffer = await image.arrayBuffer();
    const nodeBuffer = Buffer.from(imageBuffer);

    // ── Step 1: Image Classification (free HF task) ───────────────────────────
    const classifications = await classifyPlantImage(nodeBuffer);
    console.log("Classification results:", classifications);

    // ── Step 2: Generate detailed JSON analysis via text LLM ─────────────────
    const responseText = await generateDiseaseAnalysis(classifications);

    // ── Parse the JSON ────────────────────────────────────────────────────────
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON in AI response. Raw: " + responseText.substring(0, 200));
    }
    const details = JSON.parse(jsonMatch[0]);

    const diseaseName = details.diseaseName || "Unknown Issue";
    const confidenceScore = Number(details.confidenceScore) || 75.0;
    const isHealthy = diseaseName.toLowerCase().includes("healthy");

    let severity = "Low";
    if (!isHealthy && confidenceScore > 85) severity = "High";
    else if (!isHealthy && confidenceScore > 60) severity = "Medium";

    // ── Save image permanently for History page ───────────────────────────────
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const finalFilename = `scan_${Date.now()}.jpg`;
    fs.writeFileSync(path.join(uploadsDir, finalFilename), nodeBuffer);
    const publicImageUrl = `/uploads/${finalFilename}`;

    // ── Save to database ──────────────────────────────────────────────────────
    const scan = await db.diagnosisScan.create({
      data: {
        userId,
        imagePath: publicImageUrl,
        cropType: isHealthy ? "Healthy" : "Unknown",
        diseaseName,
        confidenceScore,
        severity,
        description: details.description || "Issue detected.",
        explainability: details.explainability || "Based on image classifier output.",
        riskMetrics: details.riskMetrics ? JSON.stringify(details.riskMetrics) : "{}",
        recommendedTreatment: details.recommendedTreatment || "Consult agronomist.",
        preventionTips: details.preventionTips || "Monitor closely.",
        status: "Pending",
      },
    });

    // ── Save tasks ────────────────────────────────────────────────────────────
    const createdTasks = [];
    if (Array.isArray(details.tasks)) {
      for (const task of details.tasks) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + (task.dueDays || 1));
        const newTask = await db.scheduledTask.create({
          data: {
            userId,
            title: task.title || "Follow-up Action",
            description: task.description || "",
            dueDate,
            category: task.category || "Disease",
            status: "Pending",
          },
        });
        createdTasks.push(newTask);
      }
    }

    // ── Create notification for serious issues ────────────────────────────────
    if (severity === "High" || severity === "Medium") {
      await db.notification.create({
        data: {
          userId,
          title: `Alert: ${diseaseName} Detected`,
          message: `Your recent crop scan shows signs of ${diseaseName}. Severity is ${severity}. Check your diagnosis history for treatment options.`,
          type: "alert",
        },
      });
    }

    return { success: true, data: scan, tasks: createdTasks };

  } catch (error: any) {
    console.error("Disease Detection Error:", error);
    return { success: false, error: error.message || "Failed to process image." };
  }
}
