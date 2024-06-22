import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
  @Property()
  title!: string;

  @Property()
  body: string | null = null;

  @ManyToOne()
  author!: User;
}
