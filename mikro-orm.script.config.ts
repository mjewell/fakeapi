// This config is split out from the main one because next-auth prints a
// bunch of warnings when the migrator extension is added and we dont need
// it for our runtime config, only for the package.json scripts

// eslint-disable-next-line import/order
import dotenv from "dotenv-flow";
dotenv.config();

import { Migrator } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/postgresql";
import authConfig from "./mikro-orm.config";

const config = defineConfig({
  ...authConfig,
  extensions: [Migrator],
});

export default config;
