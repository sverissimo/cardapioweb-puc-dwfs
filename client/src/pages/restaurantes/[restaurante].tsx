import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { Api } from "../../services/api"

export default function Cardapio(props: CardapioProps) {
    console.log("🚀 ~ file: [restaurante].tsx ~ line 6 ~ Restaurante ~ restaurante", props.cardapio)

    return (
        <>
            <h3>
                Im elfo
            </h3>
            <ul>
                {props.cardapio.map(el =>
                    <>
                        <li>
                            {el.nome}
                        </li>
                        <li>
                            {el.descricao} R${el.preco}
                        </li>
                    </>

                )}
            </ul>
        </>
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
    cardapio: Array<Produto>
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const
        restauranteId = ctx.params.restaurante
        , api = new Api()
        , cardapio = await api.get(`cardapio/${restauranteId}`)

    return {
        props: {
            cardapio
        }
    }
}