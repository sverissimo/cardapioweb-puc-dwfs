import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDBNewFoods1637274800001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createDatabase('newfoods', true)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropDatabase('newfoods', true)
    }
}
