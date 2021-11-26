import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.scss';
import { Header } from '../components/Header'
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp