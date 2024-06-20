import { NextApiRequest, NextApiResponse } from "next";
import { pino } from "pino";

export const logger = pino();

function round(n: number, precision: number) {
  const factor = Math.pow(10, precision);
  return Math.round(n * factor) / factor;
}

function now() {
  return typeof performance === "undefined" ? Date.now() : performance.now();
}

export function log(
  callback: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void | NextApiResponse<any>>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const start = now();
    const params = {
      method: req.method,
      url: req.url,
    };
    logger.info({
      ...params,
      message: "Request start",
    });

    const r = await callback(req, res);

    const durationMs = now() - start;
    logger.info({
      ...params,
      status: res.statusCode,
      duration: `${round(durationMs, 2)}`,
      message: "Request end",
    });

    return r;
  };
}
