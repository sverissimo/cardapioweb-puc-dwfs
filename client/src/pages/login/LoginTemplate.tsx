import styles from './login.module.scss'
import FacebookLogin from 'react-facebook-login'
import { useEffect } from 'react'

interface Props {
    signIn(e: any): Promise<void>;
    handleInput(e: React.ChangeEvent<HTMLInputElement>): void;
    componentClicked(): void;
    responseFacebook(e: any): void;
}
const { loginContainer, formContainer } = styles


const LoginTemplate = (props: Props): JSX.Element => {

    const { signIn, handleInput, componentClicked, responseFacebook } = props

    useEffect(() => {
        const
            elements = document.getElementsByClassName('kep-login-facebook metro')
            , facebookButton = elements.length && elements[0]
        facebookButton ? facebookButton.innerHTML = 'Logar com o Facebook' : void 0
    }, [])


    return (
        <div className={loginContainer}>
            <h2>Fazer login</h2>
            <main className={formContainer}>

                <form onSubmit={signIn}>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Endereço de e-mail</label>
                        <input
                            name="email"
                            className="form-control"
                            type="email"
                            id="inputEmail"
                            aria-describedby="emailHelp"
                            onChange={handleInput}
                        />
                        <div id="emailHelp" className="form-text">Seu endereço de e-mail não será compartilhado com nenhum terceiro</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                        <input
                            name="password"
                            onChange={handleInput}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1" />
                    </div>
                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <br />
                <br />
                <FacebookLogin
                    appId="447489990281843"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook}
                />
            </main>

        </div>
    )
}

export default LoginTemplate