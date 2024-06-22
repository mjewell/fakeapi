import { Migration } from '@mikro-orm/migrations';

export class Migration20240622160546 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "author_id" int not null;');
    this.addSql('alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop constraint "post_author_id_foreign";');

    this.addSql('alter table "post" drop column "author_id";');
  }

}
