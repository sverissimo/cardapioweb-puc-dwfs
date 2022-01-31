export type RestauranteDTO = {
    id: number;
    nome: string;
    ativo: boolean;
    aberto: boolean;
    cozinha: string;
    cozinhaId: number;
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    cidadeId: string;
    formasPagamento?: number[]
}