import { prisma as db } from "./db";

export async function getDefaultUserId() {
  // Check if a user exists
  let user = await db.user.findFirst();
  
  if (!user) {
    // Create a default demo user
    user = await db.user.create({
      data: {
        name: "Demo Farmer",
        phone: "1234567890",
        role: "farmer",
        language: "en",
      }
    });
  }
  
  return user.id;
}
