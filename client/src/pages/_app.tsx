import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.scss';
import { Header } from '../components/Header'
import { useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { IUsuario } from '../types/IUsuario';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  const [usuario, setUsuario] = useState({} as IUsuario)

  const logUser = (usuario: IUsuario): void => {
    setUsuario(usuario)
  }

  return (

    <UserContext.Provider value={{ ...usuario, logUser }} >

      <Header />
      <Component {...pageProps} />
    </UserContext.Provider>

  )
}

export default MyApp
