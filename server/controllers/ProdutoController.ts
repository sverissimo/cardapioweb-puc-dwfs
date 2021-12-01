import { Request, Response } from 'express'
import { ProdutoService } from '../services/ProdutoService'

class ProdutoController {


    async list(req: Request, res: Response): Promise<Response> {
        try {
            const produtoService = new ProdutoService()
            const produtos = await produtoService.list()
            return res.status(201).json(produtos)
        }
        catch (error) {
            console.log({ error: error.message })
            return res.send(error.message)
        }
    }

    async getCardapio(req: Request, res: Response): Promise<Response> {
        const { restauranteId } = req.params
        console.log("🚀 ~ file: ProdutoController.ts ~ line 21 ~ ProdutoController ~ getCardapio ~ produtoId", restauranteId)

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
            const produtoService = new ProdutoService()
            const produtos = await produtoService.create(req.body)
            return res.status(201).json(produtos)
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

        try {
            const
                produtoService = new ProdutoService()
                , produto = req.body
                , { id } = produto instanceof Object && produto

            if (!id)
                return res.status(400).send('Product id missing.')

            const updatedProduct = await produtoService.editProduto(produto)
            return res.status(200).json(updatedProduct)

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