export const selectInputs = ['ativo', 'aberto', 'categoria', 'perfil', 'restaurante']


export const inputOptions = data => {

    const
        categorias = data.categorias.map(c => c.nome)
        , cozinhas = data.cozinhas.map(c => c.nome)
        , formaPagamento = data.formaPagamento.map(p => p.descricao)
        , restaurantes = data.restaurantes.map(c => c.nome)

    return {
        aberto: ['sim', 'não'],
        ativo: ['sim', 'não'],
        categoria: categorias,
        cozinha: cozinhas,
        formaPagamento,
        perfil: ['admin', 'parceiro'],
        restaurante: restaurantes
    }
}