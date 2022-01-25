import humps from 'humps'
import { Restaurante } from "../../domain/models/Restaurante";
import { RestauranteDTO } from "../model/RestauranteDTO";
import { ModelMapper } from "./ModelMapper2";

export class RestauranteAssembler extends ModelMapper {

    public toDTO(restaurante: Restaurante) {

        const
            { endereco, cozinha, created_at, updated_at, ...restauranteDTOProps } = restaurante
            , cozinhaName = cozinha.nome
            , cidadeName = endereco.cidade.nome
            , estadoName = endereco.cidade.estado.nome

        delete cozinha.created_at
        delete cozinha.updated_at
        delete cozinha.nome
        delete endereco.cidade


        const
            restauranteDTOPreview = Object.assign({},
                {
                    ...restauranteDTOProps,
                    ...endereco,
                    ...cozinha,
                    cozinha: cozinhaName,
                    cidade: cidadeName,
                    estado: estadoName
                }
            )
            , restauranteDTO = humps.camelizeKeys(restauranteDTOPreview)


        return restauranteDTO


    }

}