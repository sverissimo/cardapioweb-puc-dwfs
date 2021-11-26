import { getCustomRepository, Repository } from "typeorm"
import { Restaurante } from "../entities/Restaurante";
import { RestauranteRepository } from "../repositories/RestauranteRepository"


interface IRestauranteCreate {
    nome: string;
    ativo: boolean;
    aberto: boolean;
    cozinha_id?: string;
}

class RestauranteService {

    private restauranteRepository: Repository<Restaurante>;

    constructor() {
        this.restauranteRepository = getCustomRepository(RestauranteRepository)
    }

    async list() {
        const restaurante = await this.restauranteRepository.find({ relations: ['cozinha'] })
        return restaurante
    }

    async getRestaurante(id: string) {
        const restaurante = await this.restauranteRepository.findOne(id, { relations: ['cozinha'] })
        return restaurante
    }

    async create({ nome, ativo, aberto, cozinha_id }: IRestauranteCreate) {

        const restauranteAlreadyExists = await this.restauranteRepository.findOne({ nome })

        if (restauranteAlreadyExists)
            throw new Error('Restaurante já existe.');

        const restaurante = this.restauranteRepository.create({
            nome,
            ativo,
            aberto,
            cozinha_id
        })

        await this.restauranteRepository.save(restaurante)
        return restaurante
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
        return updatedRestaurante
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