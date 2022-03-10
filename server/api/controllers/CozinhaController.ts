import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { CozinhaRepository } from '../../repositories/CozinhaRepository';
import { CozinhaService } from '../../domain/services/CozinhaService';

class CozinhaController {

    async list(req: Request, res: Response): Promise<Response> {

        const
            cozinhasRepository = getCustomRepository(CozinhaRepository)
            , cozinhas = await cozinhasRepository.find()

        for (let c of cozinhas) {
            delete c.created_at
            delete c.updated_at
        }

        return res.json(cozinhas)
    }

    async create(req: Request, res: Response): Promise<Response> {

        try {
            const
                cozinha = await new CozinhaService().create(req.body)
                , { created_at, updated_at, ...cozinhaDTO } = cozinha;

            return res.json(cozinhaDTO)

        } catch (error) {
            console.log("🚀 ~ file: CozinhaController.ts ~ line 15 ~ CozinhaController ~ create ~ error", error.message)
            return res.status(400).send('Cozinha já cadastrada.')
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const
            cozinhaService = new CozinhaService()
            , cozinha = req.body
            , { id } = cozinha

        if (!id)
            return res.status(400).send('Cozinha não encontrado.')

        try {
            const
                cozinhaAtual = await cozinhaService.update(cozinha)
                , { created_at, updated_at, ...cozinhaDTO } = cozinhaAtual

            return res.status(200).json(cozinhaDTO)
        } catch (error) {
            return res.send(error?.message)
        }
    }


    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const
                cozinhaService = new CozinhaService()
                , { id } = req.params

            if (!id)
                return res.status(400).send('Identificador de cozinha inválido.')

            await cozinhaService.delete(id)
            return res.status(204).send('Cozinha removida.')

        } catch (error) {
            return res.send(error?.message)
        }
    }
}

export { CozinhaController }