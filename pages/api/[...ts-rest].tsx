import { createNextRouter } from "@ts-rest/next";
import { contract } from "~/api/contract";
import { errorHandler } from "~/api/errors";
import { router } from "~/api/router";

export default createNextRouter(contract, router, {
  errorHandler,
});
