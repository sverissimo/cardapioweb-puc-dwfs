import { Request, Response } from "express";
import { getCustomRepository } from "typeorm"
import { EstadoRepository } from "../../repositories/EstadoRepository"


export class EstadoController {


    async list(req: Request, res: Response): Promise<Response> {

        try {
            const
                estadoRepository = getCustomRepository(EstadoRepository)
                , data = await estadoRepository.find({ order: { id: 'ASC' } })

            return res.json(data)
        } catch (error) {
            res.status(417).send(error.message)
        }
    }


    async create(req: Request, res: Response): Promise<Response> {

        try {
            const
                estadoRepository = getCustomRepository(EstadoRepository)
                , data = estadoRepository.create(req.body)

            await estadoRepository.save(data)
            return res.status(201).json(data)

        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async edit(req: Request, res: Response): Promise<Response> {

        try {
            const { id } = req.body
            if (!id)
                return res.status(400).send('É necessário enviar o id para editar esse item.')

            const
                estadoRepository = getCustomRepository(EstadoRepository)
                , currentData = await estadoRepository.findOne(id)
                , updatedData = estadoRepository.create({ ...currentData, ...req.body })

            if (!currentData)
                return res.status(400).send('Item não encontrado na base de dados.')

            await estadoRepository.save(updatedData)
            return res.status(200).json(updatedData)

        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {

        try {
            const { id } = req.params
            if (!id)
                return res.status(400).send('É necessário enviar o id para remover esse item.')

            const
                estadoRepository = getCustomRepository(EstadoRepository)
                , data = await estadoRepository.findOne(id)

            if (!data)
                return res.status(400).send('Item não encontrado na base de dados.')

            await estadoRepository.delete(id)
            return res.status(204).send()

        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}