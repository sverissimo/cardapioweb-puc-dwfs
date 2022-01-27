import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('estados')
export default class Estado {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column()
    nome: string;
}