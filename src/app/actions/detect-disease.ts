"use server";

import { prisma as db } from "@/lib/db";
import { getDefaultUserId } from "@/lib/auth";

export async function getAiKey() {
  return process.env.GEMINI_API_KEY;
}

export async function saveDiagnosis(details: any, base64Image: string) {
  const userId = await getDefaultUserId();

  try {
    const diseaseName = details.diseaseName || "Unknown Issue";
    const confidenceScore = Number(details.confidenceScore) || 85.0;

    let severity = "Low";
    if (confidenceScore > 85 && diseaseName !== "Healthy" && diseaseName.toLowerCase().indexOf('healthy') === -1) severity = "High";
    else if (confidenceScore > 60 && diseaseName !== "Healthy" && diseaseName.toLowerCase().indexOf('healthy') === -1) severity = "Medium";

    const publicImageUrl = `data:image/jpeg;base64,${base64Image}`;

    const scan = await db.diagnosisScan.create({
      data: {
        userId,
        imagePath: publicImageUrl, 
        cropType: diseaseName.toLowerCase().includes("healthy") ? "Healthy" : "Unknown", 
        diseaseName,
        confidenceScore,
        severity,
        description: details.description || "Issue detected.",
        explainability: details.explainability || "Analysis based on visual leaf patterns.",
        riskMetrics: details.riskMetrics ? JSON.stringify(details.riskMetrics) : "{}",
        recommendedTreatment: details.recommendedTreatment || "Consult agronomist.",
        preventionTips: details.preventionTips || "Monitor closely.",
        status: "Pending"
      }
    });

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
                status: "Pending"
             }
          });
          createdTasks.push(newTask);
       }
    }

    if (severity === "High" || severity === "Medium") {
      await db.notification.create({
        data: {
          userId,
          title: `Alert: ${diseaseName} Detected`,
          message: `Your recent crop scan shows signs of ${diseaseName}. Severity is ${severity}. Please check your diagnosis history for treatment options.`,
          type: "alert"
        }
      });
    }

    return { success: true, data: scan, tasks: createdTasks };
  } catch (error: any) {
    console.error("Database Save Error:", error);
    return { success: false, error: "Failed to save the AI diagnosis to the database." };
  }
}
