import { Request, Response } from 'express';
import { Restaurante } from '../../domain/models/Restaurante';
import { RestauranteService } from '../../domain/services/RestauranteService';
import { RestauranteAssembler } from '../assembler/RestauranteAssembler';

class RestauranteController {

    async list(req: Request, res: Response): Promise<Response> {

        const
            restauranteService = new RestauranteService()
            , restauranteAssembler = new RestauranteAssembler()
            , restaurantes = await restauranteService.list()

            , restauranteDTOCollection = restaurantes.map(r => restauranteAssembler.toDTO(r))


        return res.send(restauranteDTOCollection)
    }

    async getRestaurante(req: Request, res: Response): Promise<Response> {

        const
            { id } = req.params
            , restauranteService = new RestauranteService()
            , restauranteAssembler = new RestauranteAssembler()

        if (!id)
            return res.status(400).send('Restaurante não encontrado.')
        try {

            const restaurante: Restaurante = await restauranteService.getRestaurante(+id)

            if (!restaurante)
                res.status(404).send('Restaurante não encontrado.')

            const restauranteDTO = restauranteAssembler.toDTO(restaurante)

            return res.send(restauranteDTO)

        } catch (error) {
            console.log(error.message)
            return res.status(400).send(error.message)
        }
    }


    async create(req: Request, res: Response): Promise<Response> {
        const
            restauranteService = new RestauranteService()
            , restauranteAssembler = new RestauranteAssembler()

        try {
            const
                restauranteModel = await restauranteAssembler.toModel(req.body)
                , newRestaurante: Restaurante = await restauranteService.create(restauranteModel)

            const restauranteDTO = restauranteAssembler.toDTO(newRestaurante)

            return res.status(201).json(restauranteDTO)

        } catch (error) {
            console.log("🚀 ~ file: RestauranteController.ts ~ line 64 ~ RestauranteController ~ create ~ error", error)
            res.status(400).send(error.message)
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const
            restauranteService = new RestauranteService()
            , restauranteAssembler = new RestauranteAssembler()

        try {
            const
                restaurante = await restauranteAssembler.toModel(req.body)
                , { id } = restaurante

            if (!id)
                return res.status(400).send('Restaurante não encontrado.')

            const
                updatedRestaurante = await restauranteService.update(restaurante)
                , restauranteDTO = restauranteAssembler.toDTO(updatedRestaurante)

            return res.status(200).json(restauranteDTO)

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