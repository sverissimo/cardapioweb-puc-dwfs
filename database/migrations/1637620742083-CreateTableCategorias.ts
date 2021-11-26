import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCategorias1637620742083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "categorias",
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true
                    },
                    {
                        name: 'nome',
                        type: 'text',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('categorias')
    }

}
