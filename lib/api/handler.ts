import { AppRoute } from "@ts-rest/core";
import { createSingleRouteHandler } from "@ts-rest/next";
import { auth } from "./auth";
import { mikro, transact } from "./mikro";

export function createHandler<T extends AppRoute>(
  callback: Parameters<typeof createSingleRouteHandler<T>>[1],
  opts: { transaction?: boolean; auth?: boolean } = {}
) {
  const options = { transaction: true, auth: true, ...opts };

  let c = callback;

  if (options.transaction) {
    c = transact(callback);
  }

  c = mikro(c);

  if (options.auth) {
    c = auth(c);
  }

  return c;
}
