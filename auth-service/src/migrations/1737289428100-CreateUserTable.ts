import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1737289428100 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
           new Table({

               name: 'user',
               columns: [
                   {
                       name: 'id',
                       type: 'uuid',
                       isPrimary: true,
                       generationStrategy: 'uuid',
                   },
                   {
                       name: 'email',
                       type: 'varchar',
                       isUnique: true,
                   },
                   {
                       name : 'password',
                       type: 'varchar',
                   },
                   {
                       name: 'username',
                       type: 'varchar',
                   },
               ]
           })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
    }

}
