import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { CozinhaRepository } from '../repositories/CozinhaRepository';
import { CozinhaService } from '../services/CozinhaService';

class CozinhaController {

    async list(req: Request, res: Response): Promise<Response> {
        const
            cozinhasRepository = getCustomRepository(CozinhaRepository)
            , cozinhas = await cozinhasRepository.find({ relations: ['restaurantes'] })

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
}

export { CozinhaController }