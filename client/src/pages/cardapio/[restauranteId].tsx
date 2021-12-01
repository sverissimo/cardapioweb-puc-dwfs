import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Restaurante } from "../../entities/Restaurante"
import { Api } from "../../services/api"
import { CardapioItem } from "./CardapioItem"

export default function Cardapio(props: CardapioProps) {

    const
        { restaurante, cardapio, categorias } = props

    /* if (!restaurante || !cardapio! || categorias)
        return <h2>Carregando...</h2> */

    return (
        <div className='customContainer'>
            <h3>
                {`Restaurante ${restaurante?.nome}`}
            </h3>
            {/*@ts-ignore */}
            <h6>Cozinha {restaurante?.cozinha?.nome}</h6>
            <main className='container' style={{ border: '1px solid #ccc', borderRadius: '2rem', paddingLeft: '13%' }}>
                {
                    categorias.map((categoria, i) =>
                        <div className="cardapioCategoriaBlock" key={i}>
                            <h4>{categoria.nome}</h4>
                            {
                                cardapio.map((el, j) => el.categoria_id === categoria.id &&
                                    <CardapioItem
                                        key={j}
                                        item={el}
                                        categoria={categoria}
                                    />
                                )
                            }
                        </div>
                    )}
            </main>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

type Produto = {
    id: number,
    nome: string,
    descricao: string,
    preco: string,
    ativo: boolean,
    categoria_id: number,
    restaurante_id: string,
    categoria: object
}

type CardapioProps = {
    cardapio: Array<Produto>,
    categorias: Array<any>,
    restaurante: Restaurante
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const
        restauranteId = ctx.params.restauranteId
        , api = new Api()
        , cardapio = await api.get(`cardapio/${restauranteId}`)
        , restaurante = await api.get(`restaurantes/${restauranteId}`)
        , categorias = await api.get(`categorias`)


    return {
        props: {
            cardapio,
            categorias,
            restaurante
        }
    }
}