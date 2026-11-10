import { Prisma, PrismaClient } from '@prisma/client';

// Singleton: one Prisma client reused across hot reloads in development.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Neon's free tier sleeps when idle, so the first query after a pause can fail to connect.
const CONNECTION_ERROR_CODES = new Set(['P1001', 'P1002', 'P1008', 'P1017']);

function isConnectionError(error: unknown) {
  if (error instanceof Prisma.PrismaClientInitializationError) return true;
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    CONNECTION_ERROR_CODES.has(error.code)
  );
}

export async function withDbRetry<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (!isConnectionError(error)) throw error;
    return operation();
  }
}