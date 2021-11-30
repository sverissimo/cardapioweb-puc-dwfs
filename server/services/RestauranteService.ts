import { getCustomRepository, Repository } from "typeorm"
import { Cozinha } from "../entities/Cozinha";
import { Restaurante } from "../entities/Restaurante";
import { RestauranteRepository } from "../repositories/RestauranteRepository"
import { CozinhaService } from "./CozinhaService";


interface IRestauranteCreate {
    nome: string;
    ativo: boolean;
    aberto: boolean;
    cozinha_id?: number;
    cozinha: Cozinha
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

    async getRestaurante(id: number) {
        const restaurante = await this.restauranteRepository.findOne(id, { relations: ['cozinha'] })
        return restaurante
    }

    async create(restaurante: IRestauranteCreate) {
        console.log("🚀 ~ file: RestauranteService.ts ~ line 35 ~ RestauranteService ~ create ~ restaurante", restaurante)

        const restauranteAlreadyExists = await this.restauranteRepository.findOne({ nome: restaurante.nome })

        if (restauranteAlreadyExists)
            throw new Error('Restaurante já existe.');


        if (restaurante.cozinha_id) {
            const cozinha = await new CozinhaService().getCozinha(restaurante.cozinha_id)
            restaurante.cozinha = cozinha
        }
        const createdRestaurante = this.restauranteRepository.create(restaurante)

        await this.restauranteRepository.save(createdRestaurante)
        return createdRestaurante
    }

    async update(restaurante: Restaurante) {

        const
            { id } = restaurante
            , restauranteAtual = await this.restauranteRepository.findOne(id)

        if (!restauranteAtual)
            throw new Error('Restaurante não encontrado na base de dados.')

        if (restaurante.cozinha_id) {
            const cozinha = await new CozinhaService().getCozinha(restaurante.cozinha_id)
            restaurante.cozinha = cozinha
        }

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