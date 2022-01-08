import { EntityRepository, Repository } from "typeorm";
import Cidade from "../entities/Cidade";


@EntityRepository(Cidade)
export class CidadeRepository extends Repository<Cidade> {

}