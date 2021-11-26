import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableProduto1637620138539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE produtos
            ADD IF NOT EXISTS restaurante_id integer,
            ADD IF NOT EXISTS categoria_id integer 
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
