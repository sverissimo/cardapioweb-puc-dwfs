import { Request, Response } from "express";
import { getCustomRepository } from "typeorm"
import { FormaPagamentoRepository } from "../../repositories/FormaPagamentoRepository"


export class FormaPagamentoController {


    async list(req: Request, res: Response): Promise<Response> {

        try {
            const
                formaPagamentoRepository = getCustomRepository(FormaPagamentoRepository)
                , data = await formaPagamentoRepository.find({ order: { descricao: 'ASC' } })

            return res.json(data)
        } catch (error) {
            res.status(417).send(error.message)
        }
    }


    async create(req: Request, res: Response): Promise<Response> {

        try {
            const
                formaPagamentoRepository = getCustomRepository(FormaPagamentoRepository)
                , data = formaPagamentoRepository.create(req.body)

            await formaPagamentoRepository.save(data)
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
                formaPagamentoRepository = getCustomRepository(FormaPagamentoRepository)
                , currentData = await formaPagamentoRepository.findOne(id)
                , updatedData = formaPagamentoRepository.create({ ...currentData, ...req.body })

            if (!currentData)
                return res.status(400).send('Item não encontrado na base de dados.')

            await formaPagamentoRepository.save(updatedData)
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
                formaPagamentoRepository = getCustomRepository(FormaPagamentoRepository)
                , data = await formaPagamentoRepository.findOne(id)

            if (!data)
                return res.status(400).send('Item não encontrado na base de dados.')

            await formaPagamentoRepository.delete(id)
            return res.status(204).send()

        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}