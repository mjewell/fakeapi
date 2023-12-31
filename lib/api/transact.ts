import { Semaphore } from "@shopify/semaphore";
import { db, setTxn } from "~/lib/prisma";

// enforce a single transaction at a time
// in prod this does nothing because each lambda handles 1 request at a time
// in dev this forces api calls to run sequentially
// but it allows us to magically have transactions everywhere
export const lock = new Semaphore(1);

export function transact<T extends any[], R>(
  callback: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    const permit = await lock.acquire();

    return db().$transaction(async (txn) => {
      setTxn(txn);
      try {
        return await callback(...args);
      } finally {
        setTxn(null);
        permit.release();
      }
    });
  };
}
