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
