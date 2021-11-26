import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurante } from "./Restaurante";

@Entity('usuarios')
class Usuario {

    @PrimaryGeneratedColumn('identity')
    id: number

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    perfil: string;

    @Column()
    restaurante_id?: number;

    @OneToOne(() => Restaurante)
    @JoinColumn({ name: 'restaurante_id' })
    restaurante: Restaurante
}

export { Usuario }