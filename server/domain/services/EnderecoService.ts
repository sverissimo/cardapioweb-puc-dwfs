import { getCustomRepository } from "typeorm";
import { Endereco } from "../models/Endereco";
import { EnderecoRepository } from "../../repositories/EnderecoRepository";
import { CidadeRepository } from "../../repositories/CidadeRepository";
import Cidade from "../models/Cidade";


export class EnderecoService {

    enderecoRepository: EnderecoRepository
    cidadeRepository: CidadeRepository

    constructor() {
        this.enderecoRepository = getCustomRepository(EnderecoRepository)
        this.cidadeRepository = getCustomRepository(CidadeRepository)
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

        const newEndereco = this.enderecoRepository.create(endereco)
        endereco = await this.enderecoRepository.save(newEndereco)
        console.log("🚀 ~ file: EnderecoService.ts ~ line 32 ~ EnderecoService ~ save ~ endereco", endereco)

        return endereco
    }


    async update(endereco: Endereco | any): Promise<any> {
        const
            { id, cidade } = endereco
            , enderecoAtual = await this.enderecoRepository.find({ restaurante_id: id })
            , cidadeObj: Cidade = await this.cidadeRepository.findOne({ nome: cidade })

        if (cidadeObj)
            endereco.cidade_id = cidadeObj.id

        const updatedEndereco = this.enderecoRepository.create({
            ...enderecoAtual, ...endereco
        })

        await this.enderecoRepository.save(updatedEndereco)
        return updatedEndereco
    }
}