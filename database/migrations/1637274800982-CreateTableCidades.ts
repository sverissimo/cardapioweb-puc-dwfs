import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCidades1637274800982 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cidades',
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
                    },
                    {
                        name: 'estado_id',
                        type: 'integer',
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKEstado',
                        referencedTableName: 'estados',
                        referencedColumnNames: ['id'],
                        columnNames: ['estado_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    }
                ]
            }), true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cidades', true)
    }

}
