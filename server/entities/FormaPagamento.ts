import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('forma_pagamento')
class FormaPagamento {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column()
    descricao: string;
}

export { FormaPagamento }