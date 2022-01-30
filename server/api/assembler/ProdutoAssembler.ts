import { getCustomRepository } from "typeorm";
import { Categoria } from "../../domain/models/Categoria";
import { Produto } from "../../domain/models/Produto";
import { Restaurante } from "../../domain/models/Restaurante";
import { RestauranteService } from "../../domain/services/RestauranteService";
import { CategoriaRepository } from "../../repositories/CategoriaRepository";
import { ProdutoDTO } from "../../types/produtoDTO.type";
import IEntityAssembler from "./IEntityAssembler";


export class ProdutoAssembler implements IEntityAssembler {
    toDTO(produto: Produto): ProdutoDTO {
        const
            { categoria, restaurante, categoria_id, restaurante_id, ativo, ...produtoProps } = produto
            , categoriaName = categoria.nome
            , restauranteName = restaurante.nome

        const produtoDTO: ProdutoDTO = { ...produtoProps, categoria: categoriaName, restaurante: restauranteName }
        produtoDTO.ativo = ativo ? 'sim' : 'não'

        return produtoDTO
    }

    async toModel(produtoInput: ProdutoDTO): Promise<Produto> {

        const { categoria, restaurante, ativo, ...produtoModelProps } = produtoInput
        try {
            const
                categoriaRepository = getCustomRepository(CategoriaRepository)
                , categoriaModel: Categoria = await categoriaRepository.findOne({ nome: categoria })
                , restauranteModel: Restaurante = await new RestauranteService().findByName(restaurante)
            console.log("🚀 ~ file: ProdutoAssembler.ts ~ line 32 ~ ProdutoAssembler ~ toModel ~ restauranteModel", restauranteModel)
            console.log("🚀 ~ file: ProdutoAssembler.ts ~ line 31 ~ ProdutoAssembler ~ toModel ~ categoriaModel", categoriaModel)

            const produtoModel: Produto = {
                ...produtoModelProps,
                categoria: categoriaModel,
                restaurante: restauranteModel,
                categoria_id: categoriaModel.id,
                restaurante_id: restauranteModel.id,
                ativo: ativo === 'sim' ? true : false
            }

            return produtoModel

        } catch (error) {
            console.log("🚀 ~ file: ProdutoAssembler.ts ~ line 50 ~ ProdutoAssembler ~ toModel ~ error", error)
            throw new Error(error.message)
        }
    }
}