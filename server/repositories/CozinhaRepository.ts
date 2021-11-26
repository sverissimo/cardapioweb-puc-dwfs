import { EntityRepository, Repository } from "typeorm";
import { Cozinha } from "../entities/Cozinha";


@EntityRepository(Cozinha)
class CozinhaRepository extends Repository<Cozinha> {

}

export { CozinhaRepository }