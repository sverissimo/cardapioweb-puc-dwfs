import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany
} from "typeorm";

import { Cozinha } from "./Cozinha";
import { Endereco } from "./Endereco";
import { FormaPagamento } from "./FormaPagamento";


@Entity('restaurantes')
class Restaurante {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column()
    public nome: string;

    @Column()
    ativo: boolean;

    @Column()
    aberto: boolean;

    @JoinColumn({ name: 'cozinha_id' })
    @ManyToOne(() => Cozinha)
    cozinha: Cozinha

    @Column({ nullable: true })
    cozinha_id: number;

    @OneToOne(() => Endereco, endereco => endereco.restaurante)
    endereco?: Endereco

    @ManyToMany(() => FormaPagamento, { cascade: true })
    @JoinTable({
        name: 'restaurante_forma_pagamento',
        joinColumn: { name: 'restaurante_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'forma_pagamento_id' }
    })
    formas_pagamento: FormaPagamento[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;



}

export { Restaurante };