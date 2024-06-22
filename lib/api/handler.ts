import { AppRoute } from "@ts-rest/core";
import { createSingleRouteHandler } from "@ts-rest/next";
import { mikro, transact } from "./mikro";

export function createHandler<T extends AppRoute>(
  callback: Parameters<typeof createSingleRouteHandler<T>>[1],
  options = { transaction: true }
) {
  let c = callback;
  if (options.transaction) {
    c = transact(callback);
  }
  c = mikro(c);
  return c;
}
