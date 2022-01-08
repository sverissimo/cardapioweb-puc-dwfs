import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Cidade from "./Cidade";


@Entity('enderecos')
export class Endereco {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ nullable: true })
    public cep: string;

    @Column({ nullable: true })
    public logradouro: string;

    @Column({ nullable: true })
    public numero: string;

    @Column({ nullable: true })
    public complemento: string;

    @ManyToOne(() => Cidade)
    @JoinColumn({ name: 'cidade_id' })
    public cidade: Cidade

    @Column({ nullable: true })
    public cidade_id: number

}
