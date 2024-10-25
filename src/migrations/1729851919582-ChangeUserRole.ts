import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserRole1729851919582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Update 'public' to 'regular'
    await queryRunner.query(`
            UPDATE "users"
            SET "role" = 'regular'
            WHERE "role" = 'public'
        `);

    // Update 'private' to 'premium'
    await queryRunner.query(`
            UPDATE "users"
            SET "role" = 'premium'
            WHERE "role" = 'private'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert 'regular' back to 'public'
    await queryRunner.query(`
            UPDATE "users"
            SET "role" = 'public'
            WHERE "role" = 'regular'
        `);

    // Revert 'premium' back to 'private'
    await queryRunner.query(`
            UPDATE "users"
            SET "role" = 'private'
            WHERE "role" = 'premium'
        `);
  }
}
