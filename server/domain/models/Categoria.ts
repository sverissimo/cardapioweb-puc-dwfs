import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categorias')
export class Categoria {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column()
    nome: string;
}