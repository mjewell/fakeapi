// eslint-disable-next-line import/order
import dotenv from "dotenv-flow";
dotenv.config();

import * as Entities from "@/entities";
import { env } from "@/lib/env";
import { defineConfig } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const config = defineConfig({
  metadataProvider: TsMorphMetadataProvider,
  entities: Object.values(Entities),
  clientUrl: env.DB_URL,
  debug: env.LOG_QUERIES === "true",
});

export default config;
