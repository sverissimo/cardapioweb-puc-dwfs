import { EntityRepository, Repository } from "typeorm";
import { Cozinha } from "../domain/models/Cozinha";


@EntityRepository(Cozinha)
class CozinhaRepository extends Repository<Cozinha> {

}

export { CozinhaRepository }