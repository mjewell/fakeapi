import { transact } from "./transact";

export function createHandler<T extends any[], R>(
  callback: (...args: T) => Promise<R>,
  options = { transaction: true }
) {
  let c = callback;
  if (options.transaction) {
    c = transact(callback);
  }
  return c;
}
