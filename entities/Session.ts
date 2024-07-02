import type { AdapterSession } from "@auth/core/adapters";
import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
  types,
} from "@mikro-orm/core";
import { User } from "./User";

@Entity()
export class Session implements AdapterSession {
  @PrimaryKey()
  @Property({ type: types.string })
  id: string = crypto.randomUUID();

  @ManyToOne({
    entity: "User",
    hidden: true,
    deleteRule: "cascade",
  })
  user!: User;

  @Property({ type: types.string, persist: false })
  userId!: AdapterSession["userId"];

  @Property({ type: "Date" })
  expires!: AdapterSession["expires"];

  @Property({ type: types.string })
  @Unique()
  sessionToken!: AdapterSession["sessionToken"];
}
