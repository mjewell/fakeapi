import dotenv from "dotenv-flow";
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

type EXPLICIT_ENV = {
  ENV: "test" | "development" | "production";
  TZ: string;
  LOG_QUERIES: string;
  LOG_ERRORS: string;
  DB_HOST: string;
  DB_DATABASE: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  AUTH_SECRET: string;
  AUTH_GOOGLE_ID: string;
  AUTH_GOOGLE_SECRET: string;
};

export const env = {
  ...(process.env as unknown as EXPLICIT_ENV),
  DB_URL: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public`,
};
