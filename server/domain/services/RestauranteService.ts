import { createQueryBuilder, getCustomRepository, getRepository, Repository } from "typeorm"
import { Cozinha } from "../models/Cozinha";
import { Endereco } from "../models/Endereco";
import { Restaurante } from "../models/Restaurante";
import { EnderecoRepository } from "../../repositories/EnderecoRepository";
import { RestauranteRepository } from "../../repositories/RestauranteRepository"
import { CozinhaService } from "./CozinhaService";
import { EnderecoService } from "./EnderecoService";


interface IRestauranteCreate {
    nome: string;
    ativo: boolean;
    aberto: boolean;
    cozinha_id?: number;
    cozinha?: Cozinha
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    cidade_id?: number;
}

class RestauranteService {

    private restauranteRepository: Repository<Restaurante>;

    constructor() {
        this.restauranteRepository = getCustomRepository(RestauranteRepository)
    }

    async list() {
        const restaurante = await this.restauranteRepository.find({
            relations: ['cozinha', 'endereco', 'endereco.cidade', 'endereco.cidade.estado'],
            order: { nome: 'ASC' }
        })
        return restaurante
    }

    async getRestaurante(id: number) {
        const restaurante = await this.restauranteRepository.findOne(id, { relations: ['cozinha', 'endereco', 'endereco.cidade', 'endereco.cidade.estado'] })
        return restaurante
    }

    async findByName(nome: string) {
        const nomeRestaurante = await this.restauranteRepository.findOne({ nome })
        return nomeRestaurante
    }

    async create(restaurante: IRestauranteCreate) {

        const restauranteAlreadyExists = await this.restauranteRepository.findOne({ nome: restaurante.nome })
        if (restauranteAlreadyExists)
            throw new Error('Restaurante já existe.');

        try {

            if (restaurante.cozinha_id) {
                const cozinha = await new CozinhaService().getCozinha(restaurante.cozinha_id)
                restaurante.cozinha = cozinha
            }

            const createdRestaurante = this.restauranteRepository.create(restaurante)
            await this.restauranteRepository.save(createdRestaurante)

            const
                enderecoService = new EnderecoService()
                , endereco = { ...restaurante, restaurante_id: createdRestaurante?.id }
            await enderecoService.save(endereco)

            const
                { id } = createdRestaurante
                , newRestaurante = await this.getRestaurante(id)

            return newRestaurante

        } catch (error) {
            console.log(error.message)
            throw new Error(error.message)
        }
    }


    async update(restaurante: Restaurante) {

        const
            { id } = restaurante
            , restauranteAtual = await this.restauranteRepository.findOne(id)

        if (!restauranteAtual)
            throw new Error('Restaurante não encontrado na base de dados.')

        const updatedRestaurante = await this.restauranteRepository.create({
            ...restauranteAtual, ...restaurante
        })

        await this.restauranteRepository.save(updatedRestaurante);

        const
            enderecoService = new EnderecoService()
            , endereco = { ...restaurante, restaurante_id: updatedRestaurante?.id }
        await enderecoService.update(endereco)

        const restauranteModel = await this.getRestaurante(id)

        return restauranteModel
    }


    async delete(id: string): Promise<void> {
        try {
            await this.restauranteRepository.delete(id)
        } catch (error) {
            console.log(error.message)
            throw new Error('Erro ao apagar o restaurante.')
        }
    }
}

export { RestauranteService }