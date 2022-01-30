import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "./Categoria";
import { Restaurante } from "./Restaurante";

@Entity('produtos')
class Produto {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ nullable: true })
    nome: string;

    @Column()
    descricao?: string;

    @Column()
    preco: string;

    @Column({ default: true })
    ativo: boolean

    @Column({ nullable: true })
    categoria_id: number;

    @Column({ nullable: true })
    restaurante_id: number;

    @JoinColumn({ name: 'categoria_id' })
    @ManyToOne(() => Categoria)
    categoria: Categoria

    @JoinColumn({ name: 'restaurante_id' })
    @ManyToOne(() => Restaurante)
    restaurante: Restaurante
}

export { Produto }