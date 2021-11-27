import React, { useContext, useEffect, useState } from 'react'
import { axiosApi } from "../../services/axiosApi"
import { ToastContainer, toast } from 'react-toastify'

import LoginTemplate from "./LoginTemplate"
import { UserContext } from '../../contexts/UserContext'
import Usuario from '../../entities/Usuario'
import { useRouter } from 'next/router'



const Login = () => {

    const
        [state, setState] = useState({})

        , { logUser } = useContext(UserContext)
        , router = useRouter()

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const signIn = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        try {
            const
                response = await axiosApi.post('login', state)
                , loggedUser = response.data
            console.log("🚀 ~ file: index.tsx ~ line 21 ~ signIn ~ loggedUser", loggedUser)
            toast.success('Alright')

            const user = new Usuario(loggedUser)
            logUser(user)

            setTimeout(() => {
                router.push('/')
            }, 1200);

            /* setCookie('loggedIn', true)
            props.logUser(userFound) */
        }
        catch (err) {
            console.log("🚀 ~ file: index.tsx ~ line 35 ~ signIn ~ err?.response?.data", err?.response?.data)
            toast.error(err?.response?.data)
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