import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

let txn: Awaited<ReturnType<typeof prisma.$transaction>> | null = null;

export function setTxn(tx: typeof txn) {
  txn = tx;
}

export function db() {
  return (txn || prisma) as typeof prisma;
}
