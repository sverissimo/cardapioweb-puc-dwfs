import { EntityRepository, Repository } from "typeorm";
import { Restaurante } from "../entities/Restaurante";


@EntityRepository(Restaurante)
class RestauranteRepository extends Repository<Restaurante> {

}

export { RestauranteRepository };