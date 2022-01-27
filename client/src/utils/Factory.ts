import { Restaurante } from "../models/RestauranteModel";


export class Factory {

    create(type, props) {
        if (type === 'restaurante')
            return new Restaurante(props)

    }
}