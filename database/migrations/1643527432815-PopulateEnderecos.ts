import { MigrationInterface, QueryRunner } from "typeorm";
import { PopulateDB } from "../utils/PopulateDB";

export class PopulateEnderecos1643527432815 extends PopulateDB implements MigrationInterface {

    table: string = 'enderecos'

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.insertJSON(queryRunner, '../data/enderecos.json')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
