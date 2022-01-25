import { Request, Response } from "express";
import { getCustomRepository } from "typeorm"
import Cidade from "../../domain/models/Cidade";
import { CidadeRepository } from "../../repositories/CidadeRepository"


export class CidadeController {


    async list(req: Request, res: Response): Promise<Response> {

        try {
            const
                cidadeRepository = getCustomRepository(CidadeRepository)
                , data = await cidadeRepository.find({ order: { id: 'ASC' }, relations: ['estado'] })

            return res.json(data)
        } catch (error) {
            res.status(417).send(error.message)
        }
    }


    async create(req: Request, res: Response): Promise<Response> {

        try {
            const
                cidadeRepository = getCustomRepository(CidadeRepository)
                , data = cidadeRepository.create(req.body)

            await cidadeRepository.save(data)
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
                cidadeRepository = getCustomRepository(CidadeRepository)
                , currentData = await cidadeRepository.findOne(id)
                , updatedData = cidadeRepository.create({ ...currentData, ...req.body })

            if (!currentData)
                return res.status(400).send('Item não encontrado na base de dados.')

            await cidadeRepository.save(updatedData)
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
                cidadeRepository = getCustomRepository(CidadeRepository)
                , data = await cidadeRepository.findOne(id)

            if (!data)
                return res.status(400).send('Item não encontrado na base de dados.')

            await cidadeRepository.delete(id)
            return res.status(204).send()

        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}