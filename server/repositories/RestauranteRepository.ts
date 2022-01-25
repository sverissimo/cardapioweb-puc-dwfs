import { EntityRepository, Repository } from "typeorm";
import { Restaurante } from "../domain/models/Restaurante";


@EntityRepository(Restaurante)
class RestauranteRepository extends Repository<Restaurante> {

}

export { RestauranteRepository };