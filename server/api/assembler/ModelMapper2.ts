import { Restaurante } from "../../domain/models/Restaurante";
import { RestauranteDTO } from "../model/RestauranteDTO";

export class ModelMapper {

    mapToDTO(domainModel: any) {
        console.log("fk##########################", domainModel)
        return domainModel


    }

}