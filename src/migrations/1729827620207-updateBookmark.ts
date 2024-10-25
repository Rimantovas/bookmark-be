import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBookmark1729827620207 implements MigrationInterface {
  name = 'UpdateBookmark1729827620207';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Delete entries in bookmark_tags for bookmarks without a collection
    await queryRunner.query(`
      DELETE FROM bookmark_tags
      WHERE bookmark_id IN (
        SELECT id FROM bookmarks
        WHERE "collectionId" IS NULL
      )
    `);

    // Delete bookmarks without a collection
    await queryRunner.query(`
      DELETE FROM bookmarks
      WHERE "collectionId" IS NULL
    `);

    // Add the userId column
    await queryRunner.query(`ALTER TABLE "bookmarks" ADD "userId" uuid`);

    // Populate the userId based on the collection's userId
    await queryRunner.query(`
            UPDATE bookmarks
            SET "userId" = collections."userId"
            FROM collections
            WHERE bookmarks."collectionId" = collections.id
        `);

    // Make the userId column NOT NULL after populating it
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ALTER COLUMN "userId" SET NOT NULL`,
    );

    // Add the foreign key constraint
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_c6065536f2f6de3a0163e19a584" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_c6065536f2f6de3a0163e19a584"`,
    );
    await queryRunner.query(`ALTER TABLE "bookmarks" DROP COLUMN "userId"`);
  }
}
