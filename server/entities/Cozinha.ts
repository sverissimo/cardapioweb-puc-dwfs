import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Restaurante } from "./Restaurante";

@Entity('cozinhas')
class Cozinha {

    @PrimaryColumn()
    id: number;

    @Column()
    nome: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Restaurante, restaurante => restaurante.cozinha)
    restaurantes: Restaurante[]

    /* constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    } */
}

export { Cozinha }
