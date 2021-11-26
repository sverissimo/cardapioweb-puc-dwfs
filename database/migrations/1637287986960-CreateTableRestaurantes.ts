import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableRestaurantes1637287986960 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "restaurantes",
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
                        name: 'ativo',
                        type: 'boolean',
                        default: true
                    },
                    {
                        name: 'aberto',
                        type: 'boolean',
                        default: true
                    },
                    {
                        name: 'endereco',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'cozinha_id',
                        type: 'integer',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKCozinha',
                        referencedTableName: 'cozinhas',
                        referencedColumnNames: ['id'],
                        columnNames: ['cozinha_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    }
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('restaurantes')
    }

}
