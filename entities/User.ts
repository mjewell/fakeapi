import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity {
  @Property()
  name!: string;
}
