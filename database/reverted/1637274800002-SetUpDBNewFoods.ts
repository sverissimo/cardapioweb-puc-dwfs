import { MigrationInterface, QueryRunner } from "typeorm";

export class SetUpDBNewFoods1637274800002 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`        
            ALTER DATABASE newfoods
                WITH 
                OWNER = svom
                ENCODING = 'UTF8'
                LC_COLLATE = 'Portuguese_Brazil.1252'
                LC_CTYPE = 'Portuguese_Brazil.1252'
                TABLESPACE = pg_default
                CONNECTION LIMIT = -1;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}
