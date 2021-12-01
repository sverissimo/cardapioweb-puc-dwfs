import { GetStaticProps } from "next"
import { Api } from "../services/api"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import HomeTemplate from "./HomeTemplate"
import { Restaurante } from "../entities/Restaurante"


export default function Home(props: HomeProps) {
  const user = useContext(UserContext)

  if (props)
    return (
      <HomeTemplate
        restaurantes={props.restaurantes}
        produtos={props.produtos}
        user={user}
      />
    )
  return null
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

type HomeProps = {
  restaurantes: Array<Restaurante>,
  produtos: Produto[]
};

export const getStaticProps: GetStaticProps = async () => {

  const
    api = new Api()
    , produtos = await api.get('produtos')
    , restaurantes = await api.get('restaurantes')

  return {
    props: {
      restaurantes,
      produtos
    },
    revalidate: 1 //8hours
    //revalidate: 60 * 60 * 8 //8hours
  }
}
