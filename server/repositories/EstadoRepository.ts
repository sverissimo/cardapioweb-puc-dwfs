import { EntityRepository, Repository } from "typeorm";
import Estado from "../domain/models/Estado";


@EntityRepository(Estado)
export class EstadoRepository extends Repository<Estado> {

}