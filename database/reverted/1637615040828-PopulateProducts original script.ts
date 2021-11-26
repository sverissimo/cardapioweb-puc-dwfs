import { MigrationInterface, QueryRunner } from "typeorm";
import { readSqlFile } from "../utils/readSqlFile";

export class PopulateProducts1637615040828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jsonData = readSqlFile('../data/produtosBeta.json')

        queryRunner.query(
            `
            INSERT INTO produtos (nome, descricao, preco, categoria_id, restaurante_id)             
            select jsonb_array_elements(j)->>'nome' as nome,
                jsonb_array_elements(j)->>'descricao' as descricao,
                jsonb_array_elements(j)->>'preco' as preco,                
                jsonb_array_elements_text(j::jsonb->'categoria_id')::int as categoria_id,
                jsonb_array_elements(j)->>'restaurante_id' as restaurante_id
            from (select '${jsonData}'::jsonb as j) t 
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
