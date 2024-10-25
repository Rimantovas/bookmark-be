import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserRole1729851919582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Create a new enum type with the desired values
    await queryRunner.query(`
            CREATE TYPE "users_role_enum_new" AS ENUM('regular', 'premium')
        `);

    // Step 2: Update the column to use the new enum type, converting values
    await queryRunner.query(`
            ALTER TABLE "users" 
            ALTER COLUMN "role" TYPE "users_role_enum_new" 
            USING (
                CASE 
                    WHEN "role"::text = 'public' THEN 'regular'::users_role_enum_new
                    WHEN "role"::text = 'private' THEN 'premium'::users_role_enum_new
                    ELSE 'regular'::users_role_enum_new
                END
            )
        `);

    // Step 3: Drop the old enum type
    await queryRunner.query(`
            DROP TYPE "users_role_enum"
        `);

    // Step 4: Rename the new enum type to the original name
    await queryRunner.query(`
            ALTER TYPE "users_role_enum_new" RENAME TO "users_role_enum"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert the changes
    // Step 1: Create a new enum type with the old values
    await queryRunner.query(`
            CREATE TYPE "users_role_enum_old" AS ENUM('public', 'private')
        `);

    // Step 2: Update the column to use the old enum type, converting values back
    await queryRunner.query(`
            ALTER TABLE "users" 
            ALTER COLUMN "role" TYPE "users_role_enum_old" 
            USING (
                CASE 
                    WHEN "role"::text = 'regular' THEN 'public'::users_role_enum_old
                    WHEN "role"::text = 'premium' THEN 'private'::users_role_enum_old
                    ELSE 'public'::users_role_enum_old
                END
            )
        `);

    // Step 3: Drop the current enum type
    await queryRunner.query(`
            DROP TYPE "users_role_enum"
        `);

    // Step 4: Rename the old enum type back to the original name
    await queryRunner.query(`
            ALTER TYPE "users_role_enum_old" RENAME TO "users_role_enum"
        `);
  }
}
