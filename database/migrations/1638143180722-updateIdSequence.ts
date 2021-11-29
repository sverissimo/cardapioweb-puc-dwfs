import { MigrationInterface, QueryRunner } from "typeorm";

export class updateIdSequence1638143180722 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER SEQUENCE categorias_id_seq RESTART WITH 5;
            ALTER SEQUENCE cozinhas_id_seq RESTART WITH 5;
            ALTER SEQUENCE forma_pagamento_id_seq RESTART WITH 5;
            ALTER SEQUENCE usuarios_id_seq RESTART WITH 2;
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
