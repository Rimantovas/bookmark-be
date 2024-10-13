import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1728777371653 implements MigrationInterface {
    name = 'Initial1728777371653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "social_apps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "image" character varying NOT NULL, "website" character varying NOT NULL, "deeplink" character varying NOT NULL, CONSTRAINT "PK_faa3b9894204ee31271bc51f990" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "color" character varying NOT NULL, "icon" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookmarks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "link" character varying NOT NULL, "title" character varying, "description" character varying, "image_url" character varying, "metadata" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "appId" uuid, "collectionId" uuid, CONSTRAINT "PK_7f976ef6cecd37a53bd11685f32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "private" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('public', 'private')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "image_url" character varying, "role" "public"."users_role_enum", "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookmark_tags" ("bookmark_id" uuid NOT NULL, "tag_id" uuid NOT NULL, CONSTRAINT "PK_2d558ecda3abcfa41b8152f689a" PRIMARY KEY ("bookmark_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fab2760408a0e460cacc6cbdac" ON "bookmark_tags" ("bookmark_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6dbf982610ba36aeb391e1fead" ON "bookmark_tags" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_92e67dc508c705dd66c94615576" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_9ec479d495ba06e0d6a163c7250" FOREIGN KEY ("appId") REFERENCES "social_apps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_ec631a52a7e7397196ced83b22d" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "FK_da613d6625365707f8df0f65d81" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmark_tags" ADD CONSTRAINT "FK_fab2760408a0e460cacc6cbdacc" FOREIGN KEY ("bookmark_id") REFERENCES "bookmarks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "bookmark_tags" ADD CONSTRAINT "FK_6dbf982610ba36aeb391e1fead5" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark_tags" DROP CONSTRAINT "FK_6dbf982610ba36aeb391e1fead5"`);
        await queryRunner.query(`ALTER TABLE "bookmark_tags" DROP CONSTRAINT "FK_fab2760408a0e460cacc6cbdacc"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "FK_da613d6625365707f8df0f65d81"`);
        await queryRunner.query(`ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_ec631a52a7e7397196ced83b22d"`);
        await queryRunner.query(`ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_9ec479d495ba06e0d6a163c7250"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_92e67dc508c705dd66c94615576"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6dbf982610ba36aeb391e1fead"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fab2760408a0e460cacc6cbdac"`);
        await queryRunner.query(`DROP TABLE "bookmark_tags"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "collections"`);
        await queryRunner.query(`DROP TABLE "bookmarks"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "social_apps"`);
    }

}
