import { PrismaClient } from '@prisma/client';

const dbUrl = process.env.MY_REAL_DB_URL || process.env.DATABASE_URL || "";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient({ 
  datasourceUrl: dbUrl 
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
