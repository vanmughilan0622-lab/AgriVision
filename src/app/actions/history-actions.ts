"use server";

import { prisma as db } from "@/lib/db";
import { getDefaultUserId } from "@/lib/auth";

export async function getDiagnosisHistory() {
  const userId = await getDefaultUserId();

  try {
    const history = await db.diagnosisScan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: history };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
