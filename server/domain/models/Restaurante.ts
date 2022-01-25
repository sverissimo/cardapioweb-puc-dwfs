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
    OneToOne
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

    @OneToOne(() => Endereco, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'endereco_id' })
    endereco?: Endereco

    @Column({ nullable: true })
    endereco_id: number;

    @ManyToMany(() => FormaPagamento)
    @JoinTable()
    formaPagamento: FormaPagamento[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export { Restaurante };