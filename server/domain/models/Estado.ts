import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Cidade from "./Cidade";

@Entity('estados')
export default class Estado {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column()
    nome: string;
}