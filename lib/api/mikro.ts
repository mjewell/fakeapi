import config from "@/mikro-orm.config";
import { MikroORM, RequestContext } from "@mikro-orm/core";
import { Semaphore } from "@shopify/semaphore";

export const getORM = async () => {
  if (!global.__MikroORM__) {
    global.__MikroORM__ = await MikroORM.init(config);
  }
  return global.__MikroORM__;
};

export function mikro<T extends any[], R>(
  callback: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    const orm = await getORM();
    return RequestContext.create(orm.em, async () => callback(...args));
  };
}

let txn: Awaited<ReturnType<typeof getORM>>["em"] | null = null;

export function setTxn(tx: typeof txn) {
  txn = tx;
}

export function em() {
  const em = txn || RequestContext.getEntityManager();
  if (!em) {
    throw new Error("Entity manager not found.");
  }
  return em;
}

// enforce a single transaction at a time
// in prod this does nothing because each lambda handles 1 request at a time
// in dev this forces api calls to run sequentially
// but it allows us to magically have transactions everywhere
const lock = new Semaphore(1);

export function transact<T extends any[], R>(
  callback: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    const permit = await lock.acquire();

    return em().transactional(async (txnEm) => {
      setTxn(txnEm);
      try {
        return await callback(...args);
      } finally {
        setTxn(null);
        permit.release();
      }
    });
  };
}
