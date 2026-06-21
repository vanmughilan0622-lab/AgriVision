import { prisma } from './db';
import crypto from 'crypto';

/**
 * securely hash an Aadhar number (or token) so we never store it raw
 */
export function hashAadhar(aadharNumber: string): string {
  const SALT = process.env.AADHAR_SALT || 'neuralfield-secure-salt-2026';
  return crypto.createHash('sha256')
    .update(aadharNumber + SALT)
    .digest('hex');
}

/**
 * Log consent with immutable timestamp and IP
 */
export async function logConsent({
  userId,
  termsVersion,
  termsHash,
  ipAddress,
  userAgent,
  otpVerified
}: {
  userId: string;
  termsVersion: string;
  termsHash: string;
  ipAddress: string;
  userAgent: string;
  otpVerified: boolean;
}) {
  return prisma.consentLog.create({
    data: {
      userId,
      termsVersion,
      termsHash,
      ipAddress,
      userAgent,
      otpVerified,
      otpVerifiedAt: otpVerified ? new Date() : null,
      consentGivenAt: new Date()
    }
  });
}
