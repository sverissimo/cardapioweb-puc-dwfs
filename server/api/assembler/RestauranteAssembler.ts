import humps from 'humps'
import { getCustomRepository } from 'typeorm';
import Cidade from '../../domain/models/Cidade';
import { Cozinha } from '../../domain/models/Cozinha';
import { Restaurante } from "../../domain/models/Restaurante";
import { CozinhaService } from '../../domain/services/CozinhaService';
import { CidadeRepository } from '../../repositories/CidadeRepository';
import IEntityAssembler from './IEntityAssembler';
//import { RestauranteDTO } from "../model/RestauranteDTO";

export class RestauranteAssembler implements IEntityAssembler {

    public toDTO(restaurante: Restaurante) {

        const
            { endereco, cozinha, created_at, updated_at, ...restauranteDTOProps } = restaurante
            , cozinhaName = cozinha.nome
            , cozinha_id = cozinha.id
            , cidadeName = endereco?.cidade?.nome
            , estadoName = endereco?.cidade?.estado?.nome

        delete cozinha.created_at
        delete cozinha.updated_at
        delete cozinha.nome
        delete endereco.cidade
        delete endereco.restaurante_id
        delete endereco.id
        delete cozinha.id

        const restauranteDTOSnakeCase: any = restauranteDTOProps
        restauranteDTOSnakeCase.ativo = restauranteDTOSnakeCase.ativo ? 'sim' : 'não'
        restauranteDTOSnakeCase.aberto = restauranteDTOSnakeCase.aberto ? 'sim' : 'não'

        const
            restauranteDTOPreview = Object.assign({},
                {
                    ...restauranteDTOSnakeCase,
                    ...endereco,
                    ...cozinha,
                    cozinha_id,
                    cozinha: cozinhaName,
                    cidade: cidadeName,
                    estado: estadoName
                }
            )

        const restauranteDTO = humps.camelizeKeys(restauranteDTOPreview)

        return restauranteDTO
    }

    public async toModel(restaurante: any) {
        restaurante.ativo = restaurante.ativo === 'sim' ? true : false
        restaurante.aberto = restaurante.aberto === 'sim' ? true : false

        const
            { cidade, estado, cozinha, ..._restaurante } = restaurante
            , cozinhaObject: Cozinha = await new CozinhaService().findByName(cozinha)

        if (cozinhaObject)
            _restaurante.cozinhaId = cozinhaObject.id

        const cidadeObj: Cidade = await getCustomRepository(CidadeRepository).findOne({ nome: cidade })

        if (cidadeObj)
            _restaurante.cidade_id = cidadeObj.id

        const restauranteModel = humps.decamelizeKeys(_restaurante)
        return restauranteModel
    }
}