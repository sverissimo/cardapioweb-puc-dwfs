import { getCustomRepository } from "typeorm";
import { Endereco } from "../models/Endereco";
import { EnderecoRepository } from "../../repositories/EnderecoRepository";


export class EnderecoService {

    enderecoRepository: EnderecoRepository

    constructor() {
        this.enderecoRepository = getCustomRepository(EnderecoRepository)
    }

    async getEndereco(id: number) {

        try {

            const endereco = await this.enderecoRepository.findOne(id, { relations: ['cidade'] })
            return endereco

        } catch (error) {
            console.log("🚀 ~ file: EnderecoService.ts ~ line 13 ~ EnderecoService ~ getEndereco ~ error", error)
            throw new Error('Endereço não cadastrado no banco de dados.')
        }
    }

    async save(endereco): Promise<any> {

        const _endereco = this.enderecoRepository.create(endereco)
        endereco = await this.enderecoRepository.save(_endereco)

        console.log("🚀 ~ file: EnderecoService.ts ~ line 29 ~ EnderecoService ~ save ~ savedEndereco", endereco)
        return endereco

    }

    async update(endereco: Endereco): Promise<any> {
        const
            { id } = endereco
            , enderecoAtual = await this.enderecoRepository.findOne(id)

        console.log("🚀 ~ file: EnderecoService.ts ~ line 41 ~ EnderecoService ~ update ~ enderecoAtual", enderecoAtual)

        const updatedEndereco = this.enderecoRepository.create({
            ...enderecoAtual, ...endereco
        })

        await this.enderecoRepository.save(updatedEndereco)
        console.log("🚀 ~ file: EnderecoService.ts ~ line 49 ~ EnderecoService ~ update ~ updatedEndereco", updatedEndereco)
        return updatedEndereco
    }
}