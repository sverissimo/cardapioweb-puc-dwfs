import { EntityRepository, Repository } from "typeorm";
import Cidade from "../domain/models/Cidade";


@EntityRepository(Cidade)
export class CidadeRepository extends Repository<Cidade> {

}