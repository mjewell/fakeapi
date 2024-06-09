import { MikroORM } from "@mikro-orm/core";

declare global {
  var __MikroORM__: MikroORM;
}
