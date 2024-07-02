// eslint-disable-next-line import/order
import dotenv from "dotenv-flow";
dotenv.config();

import * as Entities from "@/entities";
import { env } from "@/lib/env";
import { Options } from "@mikro-orm/core";
import { Migrator } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const config: Options = defineConfig({
  metadataProvider: TsMorphMetadataProvider,
  entities: Object.values(Entities),
  clientUrl: env.DB_URL,
  extensions: [Migrator],
  debug: env.LOG_QUERIES === "true",
});

export default config;
