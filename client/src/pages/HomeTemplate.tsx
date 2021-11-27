import Link from "next/link"
import Image from 'next/image'
import styles from './home.module.scss'

const { homeContainer, restaurantContainer, restaurantCard } = styles


const HomeTemplate = (props) => {
    const { user } = props

    if (user?.perfil) {
        return (
            <>
                <h1>Bem vindo, {user?.nome}!</h1>
                <h3>Selecione uma das opções no meni acima</h3>
            </>
        )
    }

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

export default HomeTemplate
