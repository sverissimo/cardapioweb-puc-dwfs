import { MigrationInterface, QueryRunner } from "typeorm";
import { readSqlFile } from "../utils/readSqlFile";

export class PopulateProducts1637615040828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jsonData = readSqlFile('../data/produtosBeta.json')

        for (let row of jsonData) {
            const values = Object.values(row)
            await queryRunner.query(
                `
                INSERT INTO produtos (nome, descricao, preco, categoria_id, restaurante_id)
                values (${row})
                ON CONFLICT DO NOTHING;
                `
            )
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
