import { Request, Response } from 'express';
import { RestauranteService } from '../../domain/services/RestauranteService';
import { RestauranteAssembler } from '../assembler/RestauranteAssembler';

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

            const restaurante = await restauranteService.getRestaurante(+id)

            if (!restaurante)
                res.status(404).send('Restaurante não encontrado.')

            const restauranteDTO = new RestauranteAssembler().toDTO(restaurante)

            return res.send(restauranteDTO)

        } catch (error) {
            console.log(error.message)
            return res.status(400).send(error.message)
        }
    }


    async create(req: Request, res: Response): Promise<Response> {

        try {
            const restaurante = await new RestauranteService().create(req.body)
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

        console.log("🚀 ~ file: RestauranteController.ts ~ line 53 ~ RestauranteController ~ update ~ restaurante", restaurante)
        if (!id)
            return res.status(400).send('Restaurante não encontrado.')

        try {
            const restauranteAtual = await restauranteService.update(restaurante);
            return res.status(200).json(restauranteAtual)

        } catch (error) {
            return res.status(400).send(error?.message)
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