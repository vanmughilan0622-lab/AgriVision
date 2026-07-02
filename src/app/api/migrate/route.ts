import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { NextResponse } from 'next/server';

neonConfig.webSocketConstructor = ws;

const MIGRATION_SQL = `
-- CreateTable
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'farmer',
    "language" TEXT NOT NULL DEFAULT 'hi',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT,
    "name" TEXT,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "OnboardingProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "videoTutorial1Watched" BOOLEAN NOT NULL DEFAULT false,
    "videoTutorial2Watched" BOOLEAN NOT NULL DEFAULT false,
    "advisorCallCompleted" BOOLEAN NOT NULL DEFAULT false,
    "sensorSetupConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "firstAlertReceived" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    CONSTRAINT "OnboardingProgress_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ConsentLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "termsVersion" TEXT NOT NULL,
    "termsHash" TEXT NOT NULL,
    "consentGivenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "otpVerified" BOOLEAN NOT NULL,
    "otpVerifiedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    CONSTRAINT "ConsentLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "DataDeletionRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "DataDeletionRequest_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Farm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "sizeAcres" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Crop" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "cropType" TEXT NOT NULL,
    "plantedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SensorDevice" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "macAddress" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "vendor" TEXT NOT NULL DEFAULT 'custom_esp32',
    "batteryLevel" INTEGER NOT NULL DEFAULT 100,
    "status" TEXT NOT NULL DEFAULT 'active',
    "lastReadingAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SensorDevice_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SensorReading" (
    "id" TEXT NOT NULL,
    "sensorDeviceId" TEXT NOT NULL,
    "sensorType" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "readingAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quality" INTEGER NOT NULL DEFAULT 100,
    CONSTRAINT "SensorReading_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Advisor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "credentials" TEXT NOT NULL,
    "verificationLevel" TEXT NOT NULL DEFAULT 'unverified',
    "paymentModel" TEXT NOT NULL DEFAULT 'per_consultation',
    "shiftStart" TEXT,
    "shiftEnd" TEXT,
    "recommendationsCount" INTEGER NOT NULL DEFAULT 0,
    "failureRate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "insurance" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Advisor_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Advice" (
    "id" TEXT NOT NULL,
    "advisorId" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "cropId" TEXT,
    "recommendation" TEXT NOT NULL,
    "reasoningShown" BOOLEAN NOT NULL DEFAULT false,
    "disclaimerAccepted" BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outcome" TEXT NOT NULL DEFAULT 'unknown',
    CONSTRAINT "Advice_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "DiagnosisScan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "cropType" TEXT NOT NULL,
    "diseaseName" TEXT NOT NULL,
    "confidenceScore" DOUBLE PRECISION NOT NULL,
    "severity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "explainability" TEXT NOT NULL DEFAULT 'Analysis based on visual leaf patterns.',
    "riskMetrics" TEXT NOT NULL DEFAULT '{}',
    "recommendedTreatment" TEXT NOT NULL,
    "preventionTips" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DiagnosisScan_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ScheduledTask" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "category" TEXT NOT NULL DEFAULT 'Disease',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ScheduledTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndexes
CREATE UNIQUE INDEX IF NOT EXISTS "User_phone_key" ON "User"("phone");
CREATE UNIQUE INDEX IF NOT EXISTS "OnboardingProgress_userId_key" ON "OnboardingProgress"("userId");
CREATE INDEX IF NOT EXISTS "ConsentLog_userId_consentGivenAt_idx" ON "ConsentLog"("userId", "consentGivenAt");
CREATE UNIQUE INDEX IF NOT EXISTS "SensorDevice_macAddress_key" ON "SensorDevice"("macAddress");
CREATE INDEX IF NOT EXISTS "SensorReading_sensorDeviceId_readingAt_idx" ON "SensorReading"("sensorDeviceId", "readingAt");
CREATE UNIQUE INDEX IF NOT EXISTS "Advisor_userId_key" ON "Advisor"("userId");
CREATE UNIQUE INDEX IF NOT EXISTS "Advisor_phone_key" ON "Advisor"("phone");
CREATE INDEX IF NOT EXISTS "Advice_advisorId_timestamp_idx" ON "Advice"("advisorId", "timestamp");

-- AddForeignKeys (use DO block to skip if exists)
DO $$ BEGIN
  ALTER TABLE "OnboardingProgress" ADD CONSTRAINT "OnboardingProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "ConsentLog" ADD CONSTRAINT "ConsentLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "DataDeletionRequest" ADD CONSTRAINT "DataDeletionRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "Farm" ADD CONSTRAINT "Farm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "Crop" ADD CONSTRAINT "Crop_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "SensorDevice" ADD CONSTRAINT "SensorDevice_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "SensorReading" ADD CONSTRAINT "SensorReading_sensorDeviceId_fkey" FOREIGN KEY ("sensorDeviceId") REFERENCES "SensorDevice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "Advice" ADD CONSTRAINT "Advice_advisorId_fkey" FOREIGN KEY ("advisorId") REFERENCES "Advisor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "Advice" ADD CONSTRAINT "Advice_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "DiagnosisScan" ADD CONSTRAINT "DiagnosisScan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "ScheduledTask" ADD CONSTRAINT "ScheduledTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
`;

export async function GET() {
  const dbUrl =
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL ||
    "";

  if (!dbUrl) {
    return NextResponse.json({ error: "No database URL found" }, { status: 500 });
  }

  const pool = new Pool({ connectionString: dbUrl });

  try {
    await pool.query(MIGRATION_SQL);
    return NextResponse.json({ success: true, message: "All tables created successfully!" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    await pool.end();
  }
}
