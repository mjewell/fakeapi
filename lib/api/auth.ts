import { auth as nextAuth } from "@/auth";
import { AppRoute } from "@ts-rest/core";
import { createSingleRouteHandler } from "@ts-rest/next";
import { Unauthorized } from "http-errors";
import { Session } from "next-auth";
import { DeepRequired } from "utility-types";

export function auth<T extends AppRoute>(
  callback: Parameters<typeof createSingleRouteHandler<T>>[1]
) {
  return async (...args: Parameters<typeof callback>) => {
    const session = await nextAuth(args[0].req, args[0].res);
    if (!session) {
      throw new Unauthorized();
    }
    args[0].req.auth = session as DeepRequired<Session>;
    return callback(...args);
  };
}
