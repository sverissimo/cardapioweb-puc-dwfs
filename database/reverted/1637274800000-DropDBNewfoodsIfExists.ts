import { MigrationInterface, QueryRunner } from "typeorm";
//import {} from 'typeorm-extension'

export class DropDBNewfoodsIfExists1637274800000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropDatabase('newfoods', true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
