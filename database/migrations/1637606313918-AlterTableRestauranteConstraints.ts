import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableRestauranteConstraints1637606313918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE restaurantes
            ALTER endereco DROP NOT NULL;
     
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
