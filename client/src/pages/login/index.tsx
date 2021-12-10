import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import LoginTemplate from "./LoginTemplate"
import { UserContext } from '../../contexts/UserContext'
import Usuario from '../../entities/Usuario'
import { useRouter } from 'next/router'
import { setCookie } from '../../utils/setCookies'
import { Api } from '../../services/api'


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

    const signIn = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        try {
            const loggedUser = await api.post('login', state)
            toast.success('Alright')

            const user = new Usuario(loggedUser)
            logUser(user)
            setCookie('loggedUser', JSON.stringify(user))

            setTimeout(() => {
                router.push('/')
            }, 1200);

        }
        catch (err) {
            console.log("🚀 ~ file: index.tsx ~ line 35 ~ signIn ~ err?.response?.data", err)
            toast.error(err?.response)
        }
    }

    return (
        <>
            <LoginTemplate
                handleInput={handleInput}
                signIn={signIn}
            />
            <ToastContainer />
        </>
    )
}

export default Login