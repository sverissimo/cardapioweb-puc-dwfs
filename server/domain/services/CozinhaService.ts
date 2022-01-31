import { getCustomRepository } from "typeorm";
import { Cozinha } from "../models/Cozinha";
import { CozinhaRepository } from "../../repositories/CozinhaRepository";

interface ICozinhaCreate {
    nome: string
}

class CozinhaService {

    cozinhaRepository: CozinhaRepository

    constructor() {
        this.cozinhaRepository = getCustomRepository(CozinhaRepository)
    }

    async getCozinha(id: number) {
        const cozinha = await this.cozinhaRepository.findOne(id)
        return cozinha
    }

    async findByName(nome: string): Promise<Cozinha> {
        const cozinha: Cozinha = await this.cozinhaRepository.findOne({ nome })
        return cozinha
    }

    async create({ nome }: ICozinhaCreate) {

        const alreadyExists = await this.cozinhaRepository.findOne({ nome })

        if (alreadyExists)
            throw new Error(`Cozinha ${nome} já cadastrada.`)

        const cozinha = this.cozinhaRepository.create({ nome })
        await this.cozinhaRepository.save(cozinha)

        return cozinha
    }

    async update(cozinha: Cozinha) {

        const
            { id } = cozinha
            , cozinhaAtual = await this.cozinhaRepository.findOne(id)

        if (!cozinhaAtual)
            throw new Error('Cozinha não encontrado na base de dados.')

        const updatedCozinha = await this.cozinhaRepository.create({
            ...cozinhaAtual, ...cozinha
        })

        await this.cozinhaRepository.save(updatedCozinha);
        return updatedCozinha
    }

    async delete(id: string): Promise<void> {
        try {
            await this.cozinhaRepository.delete(id)
        } catch (error) {
            console.log(error.message)
            throw new Error('Erro ao apagar o cozinha.')
        }
    }
}

export { CozinhaService }