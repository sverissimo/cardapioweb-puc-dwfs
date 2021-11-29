import Link from 'next/link'
import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import AdminHeaderTemplate from './AdminHeaderTemplate'
import { adminMenuItems, parceiroMenuItems } from './menuItems'
import styles from './styles.module.scss'


export function Header() {
    const
        { headerContainer, logoStrip, homeLogo, mainImage, stripContent } = styles
        , user = useContext(UserContext)
        , perfil = user?.perfil
    let menuItems

    if (perfil === 'admin')
        menuItems = adminMenuItems
    if (perfil === 'parceiro')
        menuItems = parceiroMenuItems

    return (
        <header className={headerContainer}>
            {/* <div className={styles.headerContent}> */}
            <div className={logoStrip}>
                <div className={stripContent}>
                    <Link href="/">
                        <a>
                            <img className={homeLogo} src="/logo.png" alt="logo" height='78px' width='78px' />
                            <h1>
                                Cardápio Web
                            </h1>

                            <p>
                                Cardápio digital ilustrativo para fins de TCC - DWFS PUC 2021
                            </p>
                        </a>
                    </Link>
                    {
                        !perfil ?
                            <Link href='/login'>
                                <a >
                                    <span>
                                        Login
                                    </span>
                                    <img src="/loginIcon.svg" alt="" height='20rem' width='20rem' />
                                </a>
                            </Link>
                            :
                            <AdminHeaderTemplate
                                menuItems={menuItems}
                            />
                    }

                </div>
            </div>
            <div className={mainImage}>

                {/*  <img src="/headerImage.PNG" alt="header" /> */}
            </div>
        </header>
    )
}