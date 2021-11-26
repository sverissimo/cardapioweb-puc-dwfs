import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableProdutos1637588923156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'produtos',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true
                },
                {
                    name: 'nome',
                    type: 'varchar'
                },
                {
                    name: 'descricao',
                    type: 'varchar'
                },
                {
                    name: 'preco',
                    type: 'varchar'
                },
                {
                    name: 'ativo',
                    type: 'varchar'
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('produtos')
    }

}
