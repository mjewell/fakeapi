import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {
  @Property()
  name!: string;

  @OneToMany({ mappedBy: "author" })
  posts = new Collection<Post>(this);
}
