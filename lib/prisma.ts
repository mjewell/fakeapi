import { Prisma, PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.LOG_QUERIES === "true"
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

type TableNames = Array<{ tablename: string }>;
const tableNamesSQL = Prisma.sql`
  SELECT tablename FROM pg_tables WHERE schemaname='public'
`;
type Sequences = Array<{ relname: string }>;
const sequencesSQL = Prisma.sql`
  SELECT c.relname FROM pg_class AS c
    JOIN pg_namespace AS n ON c.relnamespace = n.oid
  WHERE
    c.relkind='S'
  AND
    n.nspname='public'
`;

// waiting for [Feature request: `prisma db truncate` · Issue #5596 · prisma/prisma](https://github.com/prisma/prisma/issues/5596)
export const resetDb = async () => {
  if (!["test", "development"].includes(process.env.ENV || "")) {
    throw new Error(
      "resetDb should only be called in test or development environments"
    );
  }

  // truncate all the tables
  const tablenames = await prisma.$queryRaw<TableNames>(tableNamesSQL);
  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ");
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);

  // reset all the sequences (ids)
  const sequences = await prisma.$queryRaw<Sequences>(sequencesSQL);
  for (const { relname } of sequences) {
    await prisma.$executeRawUnsafe(
      `ALTER SEQUENCE "public"."${relname}" RESTART WITH 1;`
    );
  }
};
