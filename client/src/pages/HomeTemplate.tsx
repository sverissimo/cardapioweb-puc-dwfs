import Link from "next/link"
import Image from 'next/image'
import styles from './home.module.scss'

const { homeContainer, restaurantContainer, restaurantCard } = styles


const HomeTemplate = (props) => {

    const
        { user, restaurantes } = props
        , userName = user?.nome || user?.name
        , userPic = user?.picture?.data
        , restaurantesImages = ['', '/amarelim.jpg', '/galetoItalia.png', '/jinlon.webp']

    return (
        <>
            <header className='customContainer'>
                <img src="/headerImage.PNG" alt="header" />
                {
                    userName &&
                    <h1>
                        Olá, {userName}!
                    </h1>
                }
                {
                    userPic &&
                    <Image width={85} height={85} src={userPic.url} alt='userPic' />
                }
            </header>

            <main className={homeContainer}>
                {
                    user?.perfil && user.perfil !== 'cliente' ?
                        <h3>Selecione uma das opções do menu acima</h3>
                        :
                        <>
                            <h3>Selecione um restaurante</h3>
                            <section className={restaurantContainer}>
                                <ul >
                                    {
                                        restaurantes && restaurantes.map((restaurante, i) =>
                                            <li className={restaurantCard} key={restaurante.nome}>
                                                <Link href={`/cardapio/${restaurante.id}`} >
                                                    <div>
                                                        <Image
                                                            width={84}
                                                            height={84}
                                                            src={restaurantesImages[restaurante.id] || '/restaurantGenericLogo.png'}
                                                            alt="rest" />
                                                        <span>
                                                            {restaurante.nome}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </li>
                                        )}
                                </ul>
                            </section>
                        </>
                }
            </main>
        </>
    )
}

export default HomeTemplate
