import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { CozinhaRepository } from '../repositories/CozinhaRepository';
import { CozinhaService } from '../services/CozinhaService';

class CozinhaController {

    async list(req: Request, res: Response): Promise<Response> {
        const
            cozinhasRepository = getCustomRepository(CozinhaRepository)
            , cozinhas = await cozinhasRepository.find()

        return res.json(cozinhas)
    }

    async create(req: Request, res: Response): Promise<Response> {

        try {
            const
                { nome } = req.body
                , cozinha = await new CozinhaService().create({ nome })
            return res.json(cozinha)

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
            const cozinhaAtual = await cozinhaService.update(cozinha);
            return res.status(200).json(cozinhaAtual)
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