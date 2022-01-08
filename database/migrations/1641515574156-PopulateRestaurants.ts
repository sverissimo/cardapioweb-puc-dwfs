import { MigrationInterface, QueryRunner } from "typeorm";
import { PopulateDB } from "../utils/PopulateDB";

export class PopulateRestaurants1641515574156 extends PopulateDB implements MigrationInterface {

    table = 'restaurantes'

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.insertJSON(queryRunner, '../data/restaurantes.json')

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
