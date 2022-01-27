export class Restaurante {
    id: number;
    nome: string;
    ativo: boolean;
    aberto: boolean;
    cozinha: object;
    cozinhaId: number;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    cidadeId: number;
    cidade: string;
    estado: string;
    endPoint?: string = 'restaurante';
    //formaPagamento: FormaPagamento[]  

    constructor(props) {
        Object.assign(this, props)
    }

    toTableModel(restaurante: Restaurante) {
        const { cozinhaId, cidadeId, endPoint, ...restauranteTableModel } = restaurante
        return restauranteTableModel
    }
}