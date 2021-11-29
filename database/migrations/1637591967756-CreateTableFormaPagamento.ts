import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableFormaPagamento1637591967756 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'forma_pagamento',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'descricao',
                    type: 'varchar'
                },

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('forma_pagamento')
    }

}
