import { Migration } from "@mikro-orm/migrations";

export class Migration20240622142820 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null);'
    );

    this.addSql(
      'alter table "post" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;'
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');

    this.addSql(
      'alter table "post" drop column "created_at", drop column "updated_at";'
    );
  }
}
