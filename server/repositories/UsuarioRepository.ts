import { EntityRepository, Repository } from "typeorm";
import { Usuario } from "../domain/models/Usuario";


@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario>{

}