import { IEntity } from "./IEntity";

export class Restaurante implements IEntity {
    private id: string;
    private nome: string;
    private ativo: boolean;
    private aberto: boolean;
    private cozinha: object;
    private cozinha_id: string;
    private endereco?: string;
    endPoint: string;
    //formaPagamento: FormaPagamento[]  

    constructor(props) {
        this.endPoint = 'restaurante'
        Object.assign(this, props)
    }
}