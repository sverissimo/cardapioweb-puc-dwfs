import Report from './Report'
import styles from './relatorios.module.scss'
import { Api } from '../../services/api'
import { useEffect, useState } from 'react'
const { mainContainer, container, title } = styles

const Relatorios = () => {
    const
        titles = [
            'Número de produtos por Restaurante',
            'Média de preco por Restaurante',
            'Itens por categorias',
            'Restaurantes por Cozinha',
            'Restaurantes por Cidade',
        ]
        , api = new Api()
        , [state, setState] = useState<any>(
            {
                restaurantes: [],
                produtos: [],
                categorias: []
            }
        )

    useEffect(() => {
        async function getData() {

            try {
                const
                    tables = ['restaurantes', 'produtos', 'categorias']
                    , tableRequests = tables.map(t => api.get(t))
                    , serverResponse = await Promise.all(tableRequests)
                    , data = {}

                let i = 0
                for (let t of tables) {
                    data[t] = serverResponse[i]
                    i++
                }
                console.log({ data });
                setState({ ...state, ...data, tables })

            } catch (error) { console.log({ error }) }
        }
        getData()
    }, [])

    useEffect(() => {
        const
            produtosPorRestaurante = getProdutosPorRestaurante()
            , restaurantesPorCidade = getRestaurantesPorCidade()
            , restaurantesPorCozinha = getRestaurantesPorCozinha()
            , mediaDePrecoPorRestaurante = getMediaDePreco()
            , produtosPorCategoria = getProdutosPorCategoria()

        setState({ ...state, produtosPorRestaurante, mediaDePrecoPorRestaurante, restaurantesPorCidade, restaurantesPorCozinha, produtosPorCategoria })

    }, [state.restaurantes, state.categorias])

    const getRestaurantesPorCidade = () => {

        const
            { restaurantes } = state
            , existingCities = new Set()
        restaurantes.forEach(r => existingCities.add(r.cidade))

        const restaurantesPorCidade = []
        const cidades = Array.from(existingCities)
        cidades.forEach((c: string) => {
            const count = restaurantes.filter(r => r.cidade === c).length
            if (c)
                restaurantesPorCidade.push({ [c]: count })
        })

        return restaurantesPorCidade
    }

    const getRestaurantesPorCozinha = () => {

        const
            { restaurantes } = state
            , existingKitchens = new Set()
        restaurantes.forEach(r => existingKitchens.add(r.cozinha))

        const restaurantesPorCozinha = []
        const cidades = Array.from(existingKitchens)
        cidades.forEach((c: string) => {
            const count = restaurantes.filter(r => r.cozinha === c).length
            if (c)
                restaurantesPorCozinha.push({ [c]: count })
        })

        return restaurantesPorCozinha
    }

    const getProdutosPorRestaurante = () => {
        const
            { produtos, restaurantes } = state
            , produtosPorRestaurante = []

        for (let r of restaurantes) {
            let i = 0
            produtos.forEach(p => {
                if (p.restaurante === r.nome)
                    i++
            });
            produtosPorRestaurante.push({ [r.nome]: i })
        }
        return produtosPorRestaurante
    }

    const getMediaDePreco = () => {
        const
            { produtos, restaurantes } = state
            , mediaDePrecoPorRestaurante = []

        for (let r of restaurantes) {
            let
                precoTotal = 0
                , quantidadeProdutos = 0
            produtos.forEach(p => {
                if (p?.restaurante === r.nome && p.preco) {
                    precoTotal += +p.preco
                    quantidadeProdutos++
                }
            });
            const mediaDePreco = precoTotal / quantidadeProdutos
            if (!Number.isNaN(mediaDePreco))
                mediaDePrecoPorRestaurante.push({ [r.nome]: +mediaDePreco.toFixed(2) })
        }
        return mediaDePrecoPorRestaurante
    }

    const getProdutosPorCategoria = () => {
        const
            { produtos, categorias } = state
            , produtosPorCategoria = []

        for (let c of categorias) {
            let i = 0
            produtos.forEach(p => {
                if (p.categoria === c.nome)
                    i++
            });
            produtosPorCategoria.push({ [c.nome]: i })
        }
        return produtosPorCategoria
    }

    return (

        <div className={mainContainer}>
            <h4 className={title}>Relatórios</h4>
            <main className={container}>
                {
                    titles.map((t, i) =>
                        <Report
                            key={t}
                            title={t}
                            index={i}
                            produtosPorRestaurante={state.produtosPorRestaurante}
                            mediaDePrecoPorRestaurante={state.mediaDePrecoPorRestaurante}
                            restaurantesPorCidade={state.restaurantesPorCidade}
                            restaurantesPorCozinha={state.restaurantesPorCozinha}
                            produtosPorCategoria={state.produtosPorCategoria}
                        />

                    )
                }
            </main>
        </div>
    )

}


/* 
type RelatoriosState = {
    restaurantes: Array<any>
} */

/*   const
          user = useContext(UserContext)
          , loggedIn = user?.email */

export default Relatorios