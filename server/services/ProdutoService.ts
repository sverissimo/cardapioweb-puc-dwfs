import { getCustomRepository } from "typeorm"
import { Produto } from "../entities/Produto"
import { ProdutoRepository } from "../repositories/ProdutoRepository"


class ProdutoService {

    produtoRepository: ProdutoRepository

    constructor() {
        this.produtoRepository = getCustomRepository(ProdutoRepository)
    }

    async list() {
        const produtos = await this.produtoRepository.find({ relations: ['categoria', 'restaurante'] });
        return produtos
    }

    async getCardapio(restauranteId: string) {

        const cardapio = await this.produtoRepository.find({
            where: { restaurante_id: restauranteId },
            order: { categoria_id: 'ASC', nome: 'ASC' }
        })
        return cardapio
    }

    async getProduto(id: number) {

        const produtos = await this.produtoRepository.findOne(id, { relations: ['categoria', 'restaurante'] })

        if (!produtos)
            throw new Error('Produto não encontrado')

        return produtos
    }

    async createMany(produtos: Array<any>) {

        const produtosEntities = this.produtoRepository.create(produtos)
        await this.produtoRepository.save(produtosEntities);
        return produtosEntities
    }

    async editProduto(produto: Produto) {
        const
            { id } = produto
            , produtoAtual = await this.produtoRepository.findOne(id)

        if (!produtoAtual)
            throw new Error('Produto não encontrado na base de dados.')

        const updatedProduct = this.produtoRepository.create({
            ...produtoAtual, ...produto
        })

        await this.produtoRepository.save(updatedProduct)
        return updatedProduct
    }
}

export { ProdutoService }