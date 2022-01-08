import { EntityRepository, Repository } from "typeorm";
import Estado from "../entities/Estado";


@EntityRepository(Estado)
export class EstadoRepository extends Repository<Estado> {

}