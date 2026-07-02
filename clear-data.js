const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.scheduledTask.deleteMany({});
  await prisma.diagnosisScan.deleteMany({});
  console.log('Cleared tasks and diagnoses');
}
main().catch(console.error).finally(() => prisma.$disconnect());
