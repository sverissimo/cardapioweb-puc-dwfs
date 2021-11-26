import { MigrationInterface, QueryRunner } from "typeorm";
import fs from 'fs'
import path from 'path'

const readSqlFile = (filepath: string): string[] => {
    return fs
        .readFileSync(path.join(__dirname, filepath))
        .toString()
        .replace(/\r?\n|\r/g, '')
        .split(';')
        .filter((query) => query?.length);
};


export class PopulatePgtoKitchenUserAdmin1637596531192 implements MigrationInterface {



    public async up(queryRunner: QueryRunner): Promise<void> {
        const queries = readSqlFile('../data/standardData.sql');

        for (let i = 0; i < queries.length; i++) {
            await queryRunner.query(queries[i]);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
