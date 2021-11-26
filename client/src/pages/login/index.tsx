import React, { useEffect, useState } from 'react'
import { axiosApi } from "../../services/axiosApi"
import { ToastContainer, toast } from 'react-toastify'

import LoginTemplate from "./LoginTemplate"

const tst = {
    "nome": "Fabrício",
    "email": "admin@jinlon.com",
    "password": "1234",
    "perfil": "restauranteParceiro"
}

const Login = () => {

    const [state, setState] = useState({})

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const signIn = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        try {
            const loggedUser = await axiosApi.post('login', state)
            console.log("🚀 ~ file: index.tsx ~ line 21 ~ signIn ~ loggedUser", loggedUser)
            toast.success('Alright')
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