import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemovePasswordFromUsers1729850838832
  implements MigrationInterface
{
  name = 'RemovePasswordFromUsers1729850838832';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'password');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'password',
        type: 'varchar',
        isNullable: true, // or false, depending on your previous setup
      }),
    );
  }
}
