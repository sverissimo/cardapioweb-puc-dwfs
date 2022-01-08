import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableProdutos1637595198273 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "produtos",
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: 'nome',
                        type: 'text',
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'preco',
                        type: 'varchar',
                    },
                    {
                        name: 'ativo',
                        type: 'boolean',
                        default: true
                    },
                    {
                        name: 'categoria_id',
                        type: 'integer',
                    },
                    {
                        name: 'restaurante_id',
                        type: 'integer',
                    },

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('produtos')
    }

}
