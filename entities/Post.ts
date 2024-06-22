import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Post extends BaseEntity {
  @Property()
  title!: string;

  @Property()
  body: string | null = null;
}
