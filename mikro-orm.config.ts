// eslint-disable-next-line import/order
import dotenv from "dotenv-flow";
dotenv.config();

import { Options } from "@mikro-orm/core";
import { Migrator } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/postgresql";
import * as Entities from "~/entities";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const config: Options = defineConfig({
  entities: Object.values(Entities),
  clientUrl: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public`,
  extensions: [Migrator],
  debug: process.env.LOG_QUERIES === "true",
});

export default config;
