import { Restaurante } from "../entities/Restaurante";


export class Factory {

    create(type, props) {
        if (type === 'restaurante')
            return new Restaurante(props)

    }
}