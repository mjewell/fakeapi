import { isHttpError } from "http-errors";
import { NextApiRequest, NextApiResponse } from "next";

export const errorHandler = (
  err: unknown,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (process.env.LOG_QUERIES === "true") {
    console.error(err);
  }
  if (isHttpError(err) && err.expose) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
