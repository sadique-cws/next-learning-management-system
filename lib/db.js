import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from "@auth/prisma-adapter"


export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV === 'development') {
//   globalThis.prisma = db;
// }