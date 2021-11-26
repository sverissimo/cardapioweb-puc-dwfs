import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('forma_pagamento')
class FormaPagamento {

    @PrimaryGeneratedColumn('identity')
    id: string;

    @Column()
    descricao: string;
}

export { FormaPagamento }