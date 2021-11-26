import styles from './login.module.scss'

const { loginContainer, formContainer } = styles
const LoginTemplate = () => {
    return (
        <div className={loginContainer}>
            <h2>Fazer login</h2>
            <main className={formContainer}>

                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Endereço de e-mail</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">Seu endereço de e-mail não será compartilhado com nenhum terceiro</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </main>

        </div>
    )
}

export default LoginTemplate