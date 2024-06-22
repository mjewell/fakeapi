import { createHandler } from "@/lib/api/handler";
import { em } from "@/lib/api/mikro";

export function dbTest(
  callback: Exclude<Parameters<typeof it>[2], undefined>
): typeof callback {
  return createHandler(async (...args) => {
    const r = await callback(...args);
    await em().rollback();
    return r;
  });
}
