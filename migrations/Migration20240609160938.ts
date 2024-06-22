import { Migration } from "@mikro-orm/migrations";

export class Migration20240609160938 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "post" ("id" serial primary key, "title" varchar(255) not null, "body" varchar(255) null);'
    );
  }
}
