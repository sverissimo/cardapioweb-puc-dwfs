import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Estado from "./Estado";

@Entity('cidades')
export default class Cidade {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column()
    nome: string;

    @Column()
    estado_id: number;

    @ManyToOne(() => Estado)
    @JoinColumn({ name: 'estado_id' })
    estado: Estado

    /*     constructor(props) {
            Object.assign(this, props)
        }
     */

}