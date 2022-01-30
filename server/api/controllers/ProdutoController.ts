import { Request, Response } from 'express'
import { ProdutoService } from '../../domain/services/ProdutoService'
import { ProdutoDTO } from '../../types/produtoDTO.type'
import { ProdutoAssembler } from '../assembler/ProdutoAssembler'

class ProdutoController {


    async list(req: Request, res: Response): Promise<Response> {
        const
            produtoService = new ProdutoService()
            , produtoAssembler = new ProdutoAssembler()

        try {
            const
                produtosModel = await produtoService.list()
                , produtos = produtosModel.map(p => produtoAssembler.toDTO(p))

            return res.status(201).json(produtos)
        }
        catch (error) {
            console.log({ error: error.message })
            return res.send(error.message)
        }
    }

    async getCardapio(req: Request, res: Response): Promise<Response> {
        const { restauranteId } = req.params

        try {
            const produtoService = new ProdutoService()
            const produtos = await produtoService.getCardapio(+restauranteId)
            return res.status(201).json(produtos)
        }
        catch (error) {
            console.log({ error: error.message })
            return res.status(404).send(error.message)
        }
    }

    async getProduto(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        try {
            const produtoService = new ProdutoService()
            const produtos = await produtoService.getProduto(+id)
            return res.status(201).json(produtos)
        }
        catch (error) {
            console.log({ error: error.message })
            return res.status(404).send(error.message)
        }
    }

    async create(req: Request, res: Response): Promise<Response> {

        try {
            const
                produtoService = new ProdutoService()
                , produtoAssembler = new ProdutoAssembler()
                , produtoModel = await produtoAssembler.toModel(req.body)
                , produto = await produtoService.create(produtoModel)
                , produtoDTO = produtoAssembler.toDTO(produto)

            return res.status(201).json(produtoDTO)
        }
        catch (error) {
            console.log({ error: error.message })
            return res.send(error.message)
        }
    }


    async createMany(req: Request, res: Response): Promise<Response> {

        try {
            const produtoService = new ProdutoService()
            const produtos = await produtoService.createMany(req.body)
            return res.status(201).json(produtos)
        }
        catch (error) {
            console.log({ error: error.message })
            return res.send(error.message)
        }
    }

    async editProduto(req: Request, res: Response): Promise<Response> {

        const
            produtoService = new ProdutoService()
            , produtoAssembler = new ProdutoAssembler()
            , produto = req.body
            , { id } = produto instanceof Object && produto

        if (!id)
            return res.status(400).send('Product id missing.')

        try {
            const
                produtoModel = await produtoAssembler.toModel(produto)
                , updatedProduct = await produtoService.editProduto(produtoModel)
                , produtoDTO: ProdutoDTO = produtoAssembler.toDTO(updatedProduct)

            return res.status(200).json(produtoDTO)

        } catch (error) {
            console.log("🚀 ~ file: ProdutoController.ts ~ line 61 ~ ProdutoController ~ editProduto ~ error", error.message)
            res.status(404).send('Produto não encontrado.')
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const
                produtoService = new ProdutoService()
                , { id } = req.params

            if (!id)
                return res.status(400).send('Identificador de produto inválido.')

            await produtoService.delete(id)
            return res.status(204).send('Produto removido.')

        } catch (error) {
            return res.send(error?.message)
        }
    }


}

export { ProdutoController }