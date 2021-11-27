export class Restaurante {
    id: string;
    nome: string;
    ativo: boolean;
    aberto: boolean;
    cozinha: object;
    cozinha_id: string;
    endereco?: string;
    //formaPagamento: FormaPagamento[]  

    constructor(props) {
        Object.assign(this, props)
    }
}