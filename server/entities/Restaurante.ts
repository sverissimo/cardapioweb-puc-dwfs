import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn
} from "typeorm";

import { v4 as uuid } from 'uuid';
import { Cozinha } from "./Cozinha";
import { FormaPagamento } from "./FormaPagamento";


@Entity('restaurantes')
class Restaurante {
    @PrimaryGeneratedColumn('identity')
    id: string;

    @Column()
    nome: string;

    @Column()
    ativo: boolean;

    @Column()
    aberto: boolean;

    @JoinColumn({ name: 'cozinha_id' })
    @ManyToOne(() => Cozinha)
    cozinha: Cozinha

    @Column({ nullable: true })
    cozinha_id: number;

    /*   @OneToOne(() => Endereco)
      @JoinColumn()
      endereco: Endereco */

    @Column({ nullable: true })
    endereco?: string;

    @ManyToMany(() => FormaPagamento)
    @JoinTable()
    formaPagamento: FormaPagamento[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /*   constructor() {
          if (!this.id) {
              this.id = uuid();
          }
      } */
}

export { Restaurante };