export const selectInputs = ['ativo', 'aberto', 'categoria', 'perfil', 'restaurante', 'cidade', 'estado']


export const inputOptions = data => {

    const
        categorias = data.categorias.map(c => c.nome)
        , cozinhas = data.cozinhas.map(c => c.nome)
        , formaPagamento = data.formaPagamento.map(p => p.descricao)
        , restaurantes = data.restaurantes.map(c => c.nome)
        , cidades = data.cidades.map(c => c.nome)
        , estados = data.estados.map(c => c.nome)


    return {
        aberto: ['sim', 'não'],
        ativo: ['sim', 'não'],
        categoria: categorias,
        cozinha: cozinhas,
        cidade: cidades,
        estado: estados,
        formaPagamento,
        perfil: ['admin', 'parceiro'],
        restaurante: restaurantes
    }
}