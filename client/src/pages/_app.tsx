import { Header } from '../components/Header'
import { useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { IUsuario } from '../types/IUsuario';

import '../styles/global.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { getCookie } from '../utils/setCookies';


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  const [usuario, setUsuario] = useState({} as IUsuario)

  const logUser = (usuario: IUsuario): void => {
    setUsuario(usuario)
  }

  useEffect(() => {
    const loggedUser = getCookie('loggedUser') && JSON.parse(getCookie('loggedUser'))
    console.log("🚀 ~ file: _app.tsx ~ line 25 ~ useEffect ~ loggedUser", loggedUser)

    if (!usuario.email && loggedUser)
      setUsuario({ ...usuario, ...loggedUser })

  }, [usuario])

  return (

    <UserContext.Provider value={{ ...usuario, logUser }} >

      <Header />
      <Component {...pageProps} />
    </UserContext.Provider>

  )
}

export default MyApp
