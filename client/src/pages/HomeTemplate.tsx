import Link from "next/link"
import Image from 'next/image'
import styles from './home.module.scss'

const { homeContainer, restaurantContainer, restaurantCard } = styles


const HomeTemplate = (props) => {
    const { user } = props

    if (user?.perfil) {
        return (
            <div className='customContainer' style={{ marginTop: '10px' }}>
                <img src="/headerImage.PNG" alt="header" />
                <h1>Olá, {user?.nome}!</h1>
                <h3>Selecione uma das opções do menu acima.</h3>
            </div>
        )
    }
    const restaurantesImages = ['/amarelim.jpg', '/jinlon.webp']
    return (
        <>
            <main className={homeContainer}>
                <img src="/headerImage.PNG" alt="header" />
                <h2>Escolha um dos restaurantes abaixo</h2>

                <section className={restaurantContainer}>
                    <ul >
                        {
                            props.restaurantes.map((restaurante, i) =>
                                <li className={restaurantCard} key={restaurante.id}>
                                    <Link href={`/cardapio/${restaurante.id}`} >
                                        <div>
                                            <Image width={84} height={84} src={restaurantesImages[i]} alt="rest" />
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
        </>)
}

export default HomeTemplate
