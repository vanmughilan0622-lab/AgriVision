const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.notification.deleteMany({});
  console.log('Cleared notifications');
}
main().catch(console.error).finally(() => prisma.$disconnect());
