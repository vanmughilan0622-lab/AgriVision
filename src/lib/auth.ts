import { prisma as db } from "./db";
import { SignJWT } from "jose";

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

// Simple in-memory store for MVP testing.
// In production, use Redis or a database to store OTPs.
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export async function storeOTP(phone: string, otp: string) {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore.set(phone, { otp, expiresAt });
}

export async function verifyOTP(phone: string, otp: string) {
  const stored = otpStore.get(phone);
  if (!stored) return false;
  
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(phone);
    return false;
  }
  
  if (stored.otp === otp) {
    otpStore.delete(phone);
    return true;
  }
  return false;
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_for_development_only'
);

export async function signToken(userId: string) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(JWT_SECRET);
}
