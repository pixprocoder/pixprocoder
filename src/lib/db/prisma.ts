import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@/src/generated/prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrisma() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  return new PrismaClient({ adapter, errorFormat: 'minimal' });
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { Role } from '@/src/generated/prisma/client';
