import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { Restaurante } from "../../models/RestauranteModel"
import { Api } from "../../services/api"
import CardapioItem from "../../components/Cardapio/CardapioItem"

export default function Cardapio(props: CardapioProps) {

    const { restaurante, categorias, cardapio } = props

    const router = useRouter()
    if (router.isFallback)
        return <h4>Carregando...</h4>

    return (
        <div className='customContainer'>
            <h3>
                {`Restaurante ${restaurante?.nome}`}
            </h3>
            {/*@ts-ignore*/}
            {restaurante.cozinha && <h6>Cozinha {restaurante.cozinha?.nome}</h6>}
            <main className='container' style={{ border: '1px solid #ccc', borderRadius: '2rem', paddingLeft: '13%' }}>
                {
                    categorias.map((categoria, i) =>
                        <div className="cardapioCategoriaBlock" key={i}>
                            <h4>{categoria.nome}</h4>
                            {
                                cardapio.map(el => el.categoria_id === categoria.id &&
                                    <CardapioItem
                                        key={el.id}
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
    restaurante: Restaurante,
    cozinhas: Array<any>
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