import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Restaurante } from "./Restaurante";

@Entity('cozinhas')
class Cozinha {

    @PrimaryGeneratedColumn('identity')
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
