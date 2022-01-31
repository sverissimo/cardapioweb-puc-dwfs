import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableEstados1637274800981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'estados',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'nome',
                        type: 'text',
                    }
                ]
            }), true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('estados', true)
    }

}
