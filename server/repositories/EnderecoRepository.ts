import { EntityRepository, Repository } from "typeorm";
import { Endereco } from "../entities/Endereco";


@EntityRepository(Endereco)
export class EnderecoRepository extends Repository<Endereco> {

}