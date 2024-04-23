import { PrismaClient } from '@prisma/client';

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  globalThis.prisma = db;
}