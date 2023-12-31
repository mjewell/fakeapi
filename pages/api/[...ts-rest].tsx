import { createNextRouter } from "@ts-rest/next";
import { contract } from "~/api/contract";
import { errorHandler } from "~/api/errors";
import { log } from "~/api/log";
import { router } from "~/api/router";

export default log(
  createNextRouter(contract, router, {
    errorHandler,
  })
);
