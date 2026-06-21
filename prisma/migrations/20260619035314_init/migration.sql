-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'farmer',
    "language" TEXT NOT NULL DEFAULT 'hi',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "OnboardingProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "videoTutorial1Watched" BOOLEAN NOT NULL DEFAULT false,
    "videoTutorial2Watched" BOOLEAN NOT NULL DEFAULT false,
    "advisorCallCompleted" BOOLEAN NOT NULL DEFAULT false,
    "sensorSetupConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "firstAlertReceived" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" DATETIME,
    CONSTRAINT "OnboardingProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ConsentLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "termsVersion" TEXT NOT NULL,
    "termsHash" TEXT NOT NULL,
    "consentGivenAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "otpVerified" BOOLEAN NOT NULL,
    "otpVerifiedAt" DATETIME,
    "revokedAt" DATETIME,
    CONSTRAINT "ConsentLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DataDeletionRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "requestedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "DataDeletionRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Farm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "sizeAcres" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Farm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Crop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "cropType" TEXT NOT NULL,
    "plantedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Crop_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SensorDevice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmId" TEXT NOT NULL,
    "macAddress" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "vendor" TEXT NOT NULL DEFAULT 'custom_esp32',
    "batteryLevel" INTEGER NOT NULL DEFAULT 100,
    "status" TEXT NOT NULL DEFAULT 'active',
    "lastReadingAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SensorDevice_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SensorReading" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sensorDeviceId" TEXT NOT NULL,
    "sensorType" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "readingAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quality" INTEGER NOT NULL DEFAULT 100,
    CONSTRAINT "SensorReading_sensorDeviceId_fkey" FOREIGN KEY ("sensorDeviceId") REFERENCES "SensorDevice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Advisor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "credentials" TEXT NOT NULL,
    "verificationLevel" TEXT NOT NULL DEFAULT 'unverified',
    "paymentModel" TEXT NOT NULL DEFAULT 'per_consultation',
    "shiftStart" TEXT,
    "shiftEnd" TEXT,
    "recommendationsCount" INTEGER NOT NULL DEFAULT 0,
    "failureRate" REAL NOT NULL DEFAULT 0.0,
    "insurance" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Advice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "advisorId" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "cropId" TEXT,
    "recommendation" TEXT NOT NULL,
    "reasoningShown" BOOLEAN NOT NULL DEFAULT false,
    "disclaimerAccepted" BOOLEAN NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outcome" TEXT NOT NULL DEFAULT 'unknown',
    CONSTRAINT "Advice_advisorId_fkey" FOREIGN KEY ("advisorId") REFERENCES "Advisor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Advice_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingProgress_userId_key" ON "OnboardingProgress"("userId");

-- CreateIndex
CREATE INDEX "ConsentLog_userId_consentGivenAt_idx" ON "ConsentLog"("userId", "consentGivenAt");

-- CreateIndex
CREATE UNIQUE INDEX "SensorDevice_macAddress_key" ON "SensorDevice"("macAddress");

-- CreateIndex
CREATE INDEX "SensorReading_sensorDeviceId_readingAt_idx" ON "SensorReading"("sensorDeviceId", "readingAt");

-- CreateIndex
CREATE UNIQUE INDEX "Advisor_userId_key" ON "Advisor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Advisor_phone_key" ON "Advisor"("phone");

-- CreateIndex
CREATE INDEX "Advice_advisorId_timestamp_idx" ON "Advice"("advisorId", "timestamp");
