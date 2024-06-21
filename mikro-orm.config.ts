// eslint-disable-next-line import/order
import dotenv from "dotenv-flow";
dotenv.config();

import * as Entities from "@/entities";
import { Options } from "@mikro-orm/core";
import { Migrator } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const config: Options = defineConfig({
  metadataProvider: TsMorphMetadataProvider,
  entities: Object.values(Entities),
  entitiesTs: Object.values(Entities),
  clientUrl: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public`,
  extensions: [Migrator],
  debug: process.env.LOG_QUERIES === "true",
});

export default config;
