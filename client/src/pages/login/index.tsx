import { useEffect } from "react"
import { axiosApi } from "../../services/axiosApi"


import LoginTemplate from "./LoginTemplate"

const tst = {
    "nome": "Fabrício",
    "email": "admin@jinlon.com",
    "password": "1234",
    "perfil": "restauranteParceiro"
}

const Login = () => {

    const signIn = async (user: object) => {

        //Efetua o login com as informações preenchidas pelo usuário
        try {
            await axiosApi.post('usuarios', user)
            //caso as credenciais (usuário/senha) estejam certas, um token foi armazenado. Faz-se então uma requisição GET dos dados do usuário
            const
                getUser = await axiosApi.get('/getUser'),
                userFound = getUser?.data
            //Ao se descodificar o token, se as credenciais estiverem certas e o token válido, retorna o usuário, armazena na globalStore e cria cookie local.      

            /* setCookie('loggedIn', true)
            props.logUser(userFound) */
        }
        catch (err) {
            //toast(err?.response?.data, 'error')
        }


    }

    return (
        <>
            <LoginTemplate />
        </>
    )

}

export default Login