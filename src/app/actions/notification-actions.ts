"use server";

import { prisma as db } from "@/lib/db";
import { getDefaultUserId } from "@/lib/auth";

export async function getNotifications() {
  const userId = await getDefaultUserId();

  try {
    const notifications = await db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: notifications };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function markNotificationAsRead(id: string) {
  try {
    await db.notification.update({
      where: { id },
      data: { isRead: true },
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
