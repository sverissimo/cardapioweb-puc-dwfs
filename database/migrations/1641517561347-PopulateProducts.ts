import { MigrationInterface, QueryRunner } from "typeorm";
import { PopulateDB } from "../utils/PopulateDB";

export class PopulateProducts1641517561347 extends PopulateDB implements MigrationInterface {

    table = 'produtos'

    public async up(queryRunner: QueryRunner): Promise<void> {
        //await this.insertJSON(queryRunner, '../data/produtos.json')
        const { data, columns, valuePlaceHolders } = this.convertJsonToQuery('../data/importedMenu.json')

        for (let row of data) {
            const values = Object.values(row)
            await queryRunner.query(
                `INSERT INTO ${this.table} (${columns}) 
                values (${valuePlaceHolders}) ON CONFLICT DO NOTHING;`, values
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
