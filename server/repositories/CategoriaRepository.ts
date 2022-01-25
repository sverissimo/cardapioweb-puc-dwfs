import { EntityRepository, Repository } from "typeorm";
import { Categoria } from "../domain/models/Categoria";


@EntityRepository(Categoria)
export class CategoriaRepository extends Repository<Categoria> {

}