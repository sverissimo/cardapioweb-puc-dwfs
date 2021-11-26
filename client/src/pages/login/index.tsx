import { useEffect } from "react"
import { axiosApi } from "../../services/AxiosApi"

import LoginTemplate from "./LoginTemplate"

const tst = {
    "nome": "Fabrício",
    "email": "admin@jinlon.com",
    "password": "1234",
    "perfil": "restauranteParceiro"
}

const Login = () => {

    useEffect(() => {

        /*        axiosApi.get('produtos')
                   .then(r => console.log(r))
        */

        axiosApi.post('usuarios', tst)
    }, [])

    return (
        <>
            <LoginTemplate />
        </>
    )

}

export default Login