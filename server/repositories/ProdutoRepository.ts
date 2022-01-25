import { EntityRepository, Repository } from "typeorm";
import { Produto } from "../domain/models/Produto";

@EntityRepository(Produto)
class ProdutoRepository extends Repository<Produto> {

}

export { ProdutoRepository }