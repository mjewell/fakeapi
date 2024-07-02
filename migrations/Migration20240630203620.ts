import { Migration } from '@mikro-orm/migrations';

export class Migration20240630203620 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "name" varchar(255) null, "email" varchar(255) null, "email_verified" timestamptz null, "image" varchar(255) null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "session" ("id" varchar(255) not null, "user_id" varchar(255) not null, "expires" timestamptz not null, "session_token" varchar(255) not null, constraint "session_pkey" primary key ("id"));');
    this.addSql('alter table "session" add constraint "session_session_token_unique" unique ("session_token");');

    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "body" varchar(255) null, "author_id" varchar(255) not null);');

    this.addSql('create table "account" ("id" varchar(255) not null, "user_id" varchar(255) not null, "type" varchar(255) not null, "provider" varchar(255) not null, "provider_account_id" varchar(255) not null, "refresh_token" varchar(255) null, "access_token" varchar(255) null, "expires_at" int null, "token_type" varchar(255) null, "scope" varchar(255) null, "id_token" text null, "session_state" varchar(255) null, constraint "account_pkey" primary key ("id"));');
    this.addSql('alter table "account" add constraint "account_provider_provider_account_id_unique" unique ("provider", "provider_account_id");');

    this.addSql('create table "verification_token" ("token" varchar(255) not null, "expires" timestamptz not null, "identifier" varchar(255) not null, constraint "verification_token_pkey" primary key ("token"));');
    this.addSql('alter table "verification_token" add constraint "verification_token_token_identifier_unique" unique ("token", "identifier");');

    this.addSql('alter table "session" add constraint "session_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "account" add constraint "account_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "session" drop constraint "session_user_id_foreign";');

    this.addSql('alter table "post" drop constraint "post_author_id_foreign";');

    this.addSql('alter table "account" drop constraint "account_user_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "session" cascade;');

    this.addSql('drop table if exists "post" cascade;');

    this.addSql('drop table if exists "account" cascade;');

    this.addSql('drop table if exists "verification_token" cascade;');
  }

}
