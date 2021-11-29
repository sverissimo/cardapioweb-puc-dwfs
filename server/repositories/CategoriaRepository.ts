import { EntityRepository, Repository } from "typeorm";
import { Categoria } from "../entities/Categoria";


@EntityRepository(Categoria)
export class CategoriaRepository extends Repository<Categoria> {

}