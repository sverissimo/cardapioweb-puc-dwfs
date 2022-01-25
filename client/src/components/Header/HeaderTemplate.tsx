import Link from 'next/link'
import styles from './styles.module.scss'


const { adminHeader, headerContainer, logoStrip, homeLogo, mainImage, stripContent } = styles

type Iprops = {
    menuItems: any;
    logOut: any;
    user: any
}

const HeaderTemplate = (props: Iprops) => {

    const
        { menuItems, logOut, user } = props
        , { perfil, email } = user

    return (
        <div className={logoStrip}>
            <div className={stripContent}>
                <Link href="/">
                    <a>
                        <img
                            className={homeLogo}
                            src="/logo.png" alt="logo"
                            height='78px' width='78px'
                            title='Página Inicial'
                        />
                        <h1>
                            Cardápio Web
                        </h1>

                        <p>
                            Cardápio digital ilustrativo para fins de TCC - DWFS PUC 2021
                        </p>
                    </a>
                </Link>

                {
                    !email ?
                        <Link href='/login'>
                            <a >
                                <span>
                                    Login
                                </span>
                                <img src="/loginIcon.svg"
                                    alt="" height='20rem' width='20rem'
                                    title='Entrar'
                                />
                            </a>
                        </Link>
                        :
                        <div className={adminHeader}>
                            <ul className="nav navbar-nav">
                                {
                                    perfil && perfil !== 'cliente' &&
                                    <li className='dropdown'>
                                        <a className="dropdown-toggle"
                                            href="#" role="button" id="dropdownMenuLink"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-list"></i>
                                        </a>

                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            {menuItems.map(({ endPoint, title }, i) =>
                                                <li key={i}>
                                                    <Link href={endPoint}>
                                                        <a className="dropdown-item">{title}</a>
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </li>
                                }
                                <li>
                                    <Link href='/'>
                                        <a>
                                            <i className="bi bi-box-arrow-right" onClick={() => logOut()} />
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                }
            </div>
        </div>
    )
}

export default HeaderTemplate