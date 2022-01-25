import { Cozinha } from "../../domain/models/Cozinha";
import { FormaPagamento } from "../../domain/models/FormaPagamento";


class RestauranteDTO {

    id: number;
    nome: string;
    ativo: string;
    aberto: string;
    cozinha: string;
    cozinhaId: string;
    enderecoId: number;
    logradouro: string;
    numero: string;
    complemento: string;
    formaPagamento: FormaPagamento[]
}

export { RestauranteDTO };