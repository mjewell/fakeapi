import type { AdapterAccount } from "@auth/core/adapters";
import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
  types,
} from "@mikro-orm/core";
import { User } from "./User";

type RemoveIndex<T> = {
  [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K];
};

@Entity()
@Unique({ properties: ["provider", "providerAccountId"] })
export class Account implements RemoveIndex<AdapterAccount> {
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
  userId!: AdapterAccount["userId"];

  @Property({ type: types.string })
  type!: AdapterAccount["type"];

  @Property({ type: types.string })
  provider!: AdapterAccount["provider"];

  @Property({ type: types.string })
  providerAccountId!: AdapterAccount["providerAccountId"];

  @Property({ type: types.string, nullable: true })
  refresh_token?: AdapterAccount["refresh_token"];

  @Property({ type: types.string, nullable: true })
  access_token?: AdapterAccount["access_token"];

  @Property({ type: types.integer, nullable: true })
  expires_at?: AdapterAccount["expires_at"];

  @Property({ type: types.string, nullable: true })
  token_type?: AdapterAccount["token_type"];

  @Property({ type: types.string, nullable: true })
  scope?: AdapterAccount["scope"];

  @Property({ type: types.text, nullable: true })
  id_token?: AdapterAccount["id_token"];

  @Property({ type: types.string, nullable: true })
  session_state?: AdapterAccount["session_state"];
}
