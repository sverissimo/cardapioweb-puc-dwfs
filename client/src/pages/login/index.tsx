import React, { useContext, useState } from 'react'

import LoginTemplate from "./LoginTemplate"
import { UserContext } from '../../contexts/UserContext'
import Usuario from '../../models/UsuarioModel'
import { useRouter } from 'next/router'
import { setCookie } from '../../utils/setCookies'
import { Api } from '../../services/api'
import { ToastContainer, toast } from 'react-toastify'


const Login = () => {

    const
        [state, setState] = useState({})
        , { logUser } = useContext(UserContext)
        , api = new Api()
        , router = useRouter()

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const responseFacebook = async facebookUser => {

        //Se logar com facebook, verifica se á cadastro no DB, se houver, mescla informações de cadastro com o facebook
        const
            { email } = facebookUser
            , userSearch = await api.get(`usuarios/${email}`)
        userSearch.length && Object.assign(facebookUser, userSearch[0])

        //console.log("🚀 ~ file: index.tsx ~ line 31 ~ Login ~ facebookUser", facebookUser)

        const user = new Usuario({ ...facebookUser })

        setState({ ...state, ...user })
        logUser(facebookUser)
        setCookie('loggedUser', JSON.stringify(facebookUser))

        setTimeout(() => {
            router.push('/')
        }, 1200);
    }

    const componentClicked = () => console.log('clicked!!!')


    const signIn = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        try {
            console.log("🚀 ~ file: index.tsx ~ line 54 ~ signIn ~ state", state)
            const loggedUser = await api.post('login', state)

            if (typeof loggedUser === 'string') {
                toast.error(loggedUser, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
                return
            }

            const user = new Usuario(loggedUser)
            console.log("🚀 ~ file: index.tsx ~ line 40 ~ signIn ~ user", user)
            logUser(user)
            setCookie('loggedUser', JSON.stringify(user))

            setTimeout(() => {
                router.push('/')
            }, 1200);

        }
        catch (err) {
            console.log("🚀 ~ file: index.tsx ~ line 35 ~ signIn ~ err?.response?.data", err)
            //toast.error(err?.response)
        }
    }

    return (
        <>
            <LoginTemplate
                handleInput={handleInput}
                signIn={signIn}
                componentClicked={componentClicked}
                responseFacebook={responseFacebook}
            />

            <ToastContainer
                position="top-right"
            />
        </>
    )
}

export default Login