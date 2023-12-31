import { createNextRouter } from "@ts-rest/next";
import { contract } from "~/api/contract";
import { router } from "~/api/router";
import { errorHandler } from "~/lib/api/errors";
import { log } from "~/lib/api/log";

export default log(
  createNextRouter(contract, router, {
    errorHandler,
    responseValidation: true,
  })
);
