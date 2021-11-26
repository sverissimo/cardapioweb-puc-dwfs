import { getCustomRepository } from "typeorm";
import { CozinhaRepository } from "../repositories/CozinhaRepository";

interface ICozinhaCreate {
    nome: string
}

class CozinhaService {
    async create({ nome }: ICozinhaCreate) {

        const
            cozinhaRepository = getCustomRepository(CozinhaRepository)
            , alreadyExists = await cozinhaRepository.findOne({ nome })

        if (alreadyExists)
            throw new Error(`Cozinha ${nome} já cadastrada.`)

        const cozinha = cozinhaRepository.create({ nome })
        await cozinhaRepository.save(cozinha)

        return cozinha
    }
}

export { CozinhaService }