import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableRestaurantePgto1643612571891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "restaurante_forma_pagamento",
                columns: [
                    {
                        name: 'restaurante_id',
                        type: 'integer'
                    },
                    {
                        name: 'forma_pagamento_id',
                        type: 'integer',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
