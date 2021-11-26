import { Request, Response } from 'express';
import { RestauranteService } from '../services/RestauranteService';

class RestauranteController {

    async list(req: Request, res: Response): Promise<Response> {

        const
            restauranteService = new RestauranteService()
            , restaurantes = await restauranteService.list()

        return res.send(restaurantes)
    }

    async getRestaurante(req: Request, res: Response): Promise<Response> {

        const
            { id } = req.params
            , restauranteService = new RestauranteService()

        if (!id)
            return res.status(400).send('Restaurante não encontrado.')
        try {

            const restaurantes = await restauranteService.getRestaurante(id)
            return res.send(restaurantes)
        } catch (error) {
            console.log(error.message)
            return res.status(400).send('Erro ao apagar o restaurante. Verifique se o identificador é válido.')
        }
    }


    async create(req: Request, res: Response): Promise<Response> {

        try {
            const
                { nome, ativo, aberto, cozinha_id } = req.body
                , restaurante = await new RestauranteService().create({ nome, ativo, aberto, cozinha_id })

            return res.status(201).json(restaurante)

        } catch (error) {
            console.log("🚀 ~ file: RestauranteController.ts ~ line 44 ~ RestauranteController ~ create ~ error", error)
            res.status(400).send(`Restaurante de nome ${req?.body?.nome} já existe`)
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const
            restauranteService = new RestauranteService()
            , restaurante = req.body
            , { id } = restaurante

        if (!id)
            return res.status(400).send('Restaurante não encontrado.')

        try {
            const restauranteAtual = await restauranteService.update(restaurante);
            return res.status(200).json(restauranteAtual)
        } catch (error) {
            return res.send(error?.message)
        }


    }


    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const
                restauranteService = new RestauranteService()
                , { id } = req.params

            if (!id)
                return res.status(400).send('Identificador de restaurante inválido.')

            await restauranteService.delete(id)
            return res.status(204).send('Restaurante removido.')

        } catch (error) {
            return res.send(error?.message)
        }
    }
}

export { RestauranteController }