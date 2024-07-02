import { randomUUID } from "crypto";
import type { AdapterUser } from "@auth/core/adapters";
import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
  types,
} from "@mikro-orm/core";
import { Account } from "./Account";
import { Post } from "./Post";
import { Session } from "./Session";

type RemoveIndex<T> = {
  [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K];
};

@Entity()
export class User implements RemoveIndex<AdapterUser> {
  @PrimaryKey()
  id: string = randomUUID();

  @Property({ type: types.string, nullable: true })
  name?: AdapterUser["name"];

  @Property({ type: types.string, nullable: true })
  @Unique()
  email: AdapterUser["email"] = "";

  @Property({ type: types.datetime, nullable: true })
  emailVerified: AdapterUser["emailVerified"] = null;

  @Property({ type: types.string, nullable: true })
  image?: AdapterUser["image"];

  @OneToMany({
    entity: "Session",
    mappedBy: (session: Session) => session.user,
    hidden: true,
    orphanRemoval: true,
  })
  sessions = new Collection<Session, object>(this);

  @OneToMany({
    entity: "Account",
    mappedBy: (account: Account) => account.user,
    hidden: true,
    orphanRemoval: true,
  })
  accounts = new Collection<Account, object>(this);

  @OneToMany({ mappedBy: "author" })
  posts = new Collection<Post>(this);
}
