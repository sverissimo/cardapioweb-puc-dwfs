import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableEnderecos1637287986959 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'enderecos',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'cep',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'logradouro',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'numero',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'complemento',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'cidade_id',
                    type: 'integer',
                    isNullable: true
                }
            ],
            foreignKeys: [
                {
                    name: 'FKCidade',
                    referencedTableName: 'cidades',
                    referencedColumnNames: ['id'],
                    columnNames: ['cidade_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('enderecos')
    }

}
