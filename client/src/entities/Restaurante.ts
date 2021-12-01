import { IEntity } from "./IEntity";

export class Restaurante implements IEntity {
    id: string;
    nome: string;
    ativo: boolean;
    aberto: boolean;
    cozinha: object;
    cozinha_id: string;
    endereco?: string;
    endPoint: string;
    //formaPagamento: FormaPagamento[]  

    constructor(props) {
        this.endPoint = 'restaurante'
        Object.assign(this, props)
    }
}