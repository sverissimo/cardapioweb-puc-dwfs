import Link from 'next/link'
import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { IUsuario } from '../../types/IUsuario'
import { deleteCookie } from '../../utils/setCookies'
import HeaderTemplate from './HeaderTemplate'
import { adminMenuItems, parceiroMenuItems } from './menuItems'
import styles from './styles.module.scss'


export function Header() {
    const
        { headerContainer } = styles
        , user = useContext(UserContext)
        , { logUser } = useContext(UserContext)
        , perfil = user?.perfil
    console.log("🚀 ~ file: index.tsx ~ line 17 ~ Header ~ perfil", perfil)

    let menuItems = []

    if (perfil === 'Administrador')
        menuItems = adminMenuItems
    if (perfil === 'Parceiro')
        menuItems = parceiroMenuItems
    console.log("🚀 ~ file: index.tsx ~ line 24 ~ Header ~ menuItems", menuItems)

    const logOut = () => {
        const { picture } = user
        if (picture && window['FB'])
            window['FB'].logout()
        deleteCookie('loggedUser')
        logUser({} as IUsuario)
    }

    return (
        <header className={headerContainer}>
            <HeaderTemplate
                user={user}
                menuItems={menuItems}
                logOut={logOut}
            />

            {/*
            <div className={mainImage}>
            </div>
         */}

        </header>
    )
}