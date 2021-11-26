import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}

export { Usuario }