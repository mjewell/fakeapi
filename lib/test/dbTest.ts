import { em, mikro, transact } from "@/lib/api/mikro";

export function dbTest(
  callback: Exclude<Parameters<typeof it>[2], undefined>
): typeof callback {
  return mikro(
    transact(async (...args) => {
      const r = await callback(...args);
      await em().rollback();
      return r;
    })
  );
}
