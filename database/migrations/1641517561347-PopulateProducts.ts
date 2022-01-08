import { MigrationInterface, QueryRunner } from "typeorm";
import { PopulateDB } from "../utils/PopulateDB";

export class PopulateProducts1641517561347 extends PopulateDB implements MigrationInterface {

    table = 'produtos'

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.insertJSON(queryRunner, '../data/produtos.json')

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
