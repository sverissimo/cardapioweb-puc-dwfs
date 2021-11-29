import { Request, Response } from "express";
import { getCustomRepository } from "typeorm"
import { CategoriaRepository } from "../repositories/CategoriaRepository"


export class CategoriaController {


    async list(req: Request, res: Response): Promise<Response> {

        try {
            const
                categoriaRepository = getCustomRepository(CategoriaRepository)
                , data = await categoriaRepository.find()

            return res.json(data)
        } catch (error) {
            res.status(417).send(error.message)
        }
    }


    async create(req: Request, res: Response): Promise<Response> {

        try {
            const
                categoriaRepository = getCustomRepository(CategoriaRepository)
                , data = categoriaRepository.create(req.body)

            await categoriaRepository.save(data)
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
                categoriaRepository = getCustomRepository(CategoriaRepository)
                , currentData = await categoriaRepository.findOne(id)
                , updatedData = categoriaRepository.create({ ...currentData, ...req.body })

            if (!currentData)
                return res.status(400).send('Item não encontrado na base de dados.')

            await categoriaRepository.save(updatedData)
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
                categoriaRepository = getCustomRepository(CategoriaRepository)
                , data = await categoriaRepository.findOne(id)

            if (!data)
                return res.status(400).send('Item não encontrado na base de dados.')

            await categoriaRepository.delete(id)
            return res.status(204).send()

        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}