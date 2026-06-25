"use server";

import { prisma as db } from "@/lib/db";
import { getDefaultUserId } from "@/lib/auth";

export async function getDashboardStats() {
  const userId = await getDefaultUserId();

  try {
    const scans = await db.diagnosisScan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const totalScans = scans.length;
    const diseasesDetected = scans.filter(s => s.diseaseName !== "Healthy").length;
    const healthyScans = totalScans - diseasesDetected;
    const healthyPercentage = totalScans > 0 ? Math.round((healthyScans / totalScans) * 100) : 0;
    
    // Farm health score (simple heuristic)
    const criticalScans = scans.filter(s => s.severity === "High").length;
    const farmHealthScore = totalScans > 0 ? Math.max(0, 100 - (criticalScans * 10) - (diseasesDetected * 2)) : 100;

    // Trend data for charts (group by date)
    const trendsMap: Record<string, number> = {};
    const reversedScans = [...scans].reverse(); // oldest first
    reversedScans.forEach(scan => {
      const date = new Date(scan.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
      if (!trendsMap[date]) trendsMap[date] = 0;
      if (scan.severity === "High" || scan.severity === "Medium") {
        trendsMap[date]++;
      }
    });

    const trends = Object.keys(trendsMap).map(date => ({
      date,
      cases: trendsMap[date]
    }));

    return { 
      success: true, 
      data: {
        totalScans,
        diseasesDetected,
        healthyPercentage,
        farmHealthScore,
        recentDiagnoses: scans.slice(0, 5),
        trends
      } 
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getTasks() {
  const userId = await getDefaultUserId();
  try {
    const tasks = await db.scheduledTask.findMany({
      where: { userId },
      orderBy: { dueDate: "asc" }
    });
    return { success: true, data: tasks };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getFarmTimeline() {
  const userId = await getDefaultUserId();
  try {
    const scans = await db.diagnosisScan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });

    let tasks = await db.scheduledTask.findMany({
      where: { userId },
      orderBy: { dueDate: "desc" }
    });

    const hasCompletedTasks = tasks.some(t => t.status === "Completed");
    if (!hasCompletedTasks) {
      const now = new Date();
      const seedTasks = [
        {
          userId,
          title: "Autonomous Irrigation: Pump Activated",
          description: "Sensor reading detected soil moisture at critical level (22%). Verified no rain expected in 48-hour weather forecast. Pump activated for 45 minutes to reach 40% moisture target.",
          status: "Completed",
          category: "Irrigation",
          createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
          dueDate: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
        },
        {
          userId,
          title: "Irrigation Skipped: Rain Forecasted",
          description: "Scheduled irrigation was overridden. AI detected an 80% probability of rain. Postponing watering saved an estimated ₹450 in energy and water costs.",
          status: "Completed",
          category: "Weather",
          createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          dueDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          userId,
          title: "Nutrient Adjustment",
          description: "Connected to Crop Health Database: Minor nitrogen deficiency flagged based on historical yield patterns. Recommended adding 10kg Nitrogen to sector 2.",
          status: "Completed",
          category: "Fertilizer",
          createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          dueDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        }
      ];

      for (const t of seedTasks) {
        await db.scheduledTask.create({ data: t });
      }
      
      tasks = await db.scheduledTask.findMany({
        where: { userId },
        orderBy: { dueDate: "desc" }
      });
    }

    const timeline: any[] = [];

    scans.forEach(scan => {
      timeline.push({
        id: scan.id,
        type: 'diagnosis',
        title: scan.diseaseName,
        description: scan.severity === "High" ? "Critical attention required" : "Routine scan completed",
        severity: scan.severity,
        date: scan.createdAt,
        category: 'Disease'
      });
    });

    tasks.forEach(task => {
      timeline.push({
        id: task.id,
        type: 'task',
        title: task.title,
        description: task.description,
        status: task.status,
        date: task.status === "Completed" ? task.createdAt : task.dueDate,
        category: task.category
      });
    });

    timeline.sort((a, b) => b.date.getTime() - a.date.getTime());

    return { success: true, data: timeline };

  } catch (error: any) {
    console.error("Timeline Error:", error);
    return { success: false, error: error.message };
  }
}
