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

    @JoinColumn({ name: 'restaurante_id' })
    @OneToOne(() => Restaurante, { nullable: true })
    restaurante?: Restaurante

    @Column({ nullable: true })
    restaurante_id?: number;

}

export { Usuario }