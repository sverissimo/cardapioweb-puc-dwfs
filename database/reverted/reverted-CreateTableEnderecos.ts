import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableEnderecos1637342535853 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'enderecos',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
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
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('enderecos')
    }

}
