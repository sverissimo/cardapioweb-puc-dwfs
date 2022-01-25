import { EntityRepository, Repository } from "typeorm";
import { Endereco } from "../domain/models/Endereco";


@EntityRepository(Endereco)
export class EnderecoRepository extends Repository<Endereco> {

}