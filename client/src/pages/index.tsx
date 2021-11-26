import { GetStaticProps } from "next"
import Link from "next/link"
import Image from 'next/image'
import { Api } from "../services/api"
import styles from './home.module.scss'

const { homeContainer, restaurantContainer, restaurantCard } = styles

export default function Home(props: HomeProps) {

  return (
    <>
      <main className={homeContainer}>
        <h2>Escolha um dos restaurantes abaixo</h2>

        <section className={restaurantContainer}>
          <ul >
            {
              props.restaurantes.map(restaurante =>
                <li className={restaurantCard} key={restaurante.id}>
                  <Link href={`/restaurantes/${restaurante.id}`} >
                    <div>
                      <Image width={64} height={64} src="/jinlon.webp" alt="rest" />
                      <span>

                        {restaurante.nome}
                      </span>
                    </div>
                  </Link>
                </li>
              )}
          </ul>
        </section>
      </main>
    </>
  )
}

type Restaurante = {

  id: string,
  nome: string,
  ativo: boolean,
  aberto: boolean,
  cozinha: object,
  cozinha_id: string,
  endereco?: string,
  //formaPagamento: FormaPagamento[]  
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
    revalidate: 5 //8hours
    //revalidate: 60 * 60 * 8 //8hours
  }
}
