import type { VerificationToken as AdapterVerificationToken } from "@auth/core/adapters";
import { Entity, PrimaryKey, Property, Unique, types } from "@mikro-orm/core";

@Entity()
@Unique({ properties: ["token", "identifier"] })
export class VerificationToken implements AdapterVerificationToken {
  @PrimaryKey()
  @Property({ type: types.string })
  token!: AdapterVerificationToken["token"];

  @Property({ type: "Date" })
  expires!: AdapterVerificationToken["expires"];

  @Property({ type: types.string })
  identifier!: AdapterVerificationToken["identifier"];
}
