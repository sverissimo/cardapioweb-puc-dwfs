import { getCustomRepository } from "typeorm"
import { Produto } from "../models/Produto"
import { CategoriaRepository } from "../../repositories/CategoriaRepository"
import { ProdutoRepository } from "../../repositories/ProdutoRepository"
import { RestauranteService } from "./RestauranteService"


class ProdutoService {

    produtoRepository: ProdutoRepository

    constructor() {
        this.produtoRepository = getCustomRepository(ProdutoRepository)
    }

    async list() {
        const produtos = await this.produtoRepository.find({ relations: ['categoria', 'restaurante'], order: { categoria: 'ASC', nome: 'ASC' } });
        return produtos
    }

    async getCardapio(restauranteId: number) {

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

    async create(produto) {


        if (produto.categoria_id) {
            const categoriaRepository = getCustomRepository(CategoriaRepository)
            produto.categoria = await categoriaRepository.findOne(produto.categoria_id)
        }
        if (produto.restaurante_id) {
            const restaurante = await new RestauranteService().getRestaurante(produto.restaurante_id)
            produto.restaurante = restaurante
        }

        const produtoEntities = this.produtoRepository.create(produto)
        await this.produtoRepository.save(produtoEntities);
        return produtoEntities
    }

    async createMany(produtos: Array<any>) {

        if (!Array.isArray(produtos))
            produtos = [produtos]

        for (let produto of produtos) {
            if (produto.categoria_id) {
                const categoriaRepository = getCustomRepository(CategoriaRepository)
                produto.categoria = await categoriaRepository.findOne(produto.categoria_id)
            }
            if (produto.restaurante_id) {
                const restaurante = await new RestauranteService().getRestaurante(produto.restaurante_id)
                produto.restaurante = restaurante
            }
        }

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

        if (produto.categoria_id) {
            const categoriaRepository = getCustomRepository(CategoriaRepository)
            produto.categoria = await categoriaRepository.findOne(produto.categoria_id)
        }

        if (produto.restaurante_id) {
            const restaurante = await new RestauranteService().getRestaurante(produto.restaurante_id)
            produto.restaurante = restaurante
        }

        const updatedProduct = this.produtoRepository.create({
            ...produtoAtual, ...produto
        })

        await this.produtoRepository.save(updatedProduct)
        return updatedProduct
    }

    async delete(id: string): Promise<void> {
        try {
            await this.produtoRepository.delete(id)
        } catch (error) {
            console.log(error.message)
            throw new Error('Erro ao apagar o produto.')
        }
    }

}

export { ProdutoService }