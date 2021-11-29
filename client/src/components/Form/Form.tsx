import styles from './login.module.scss'

interface Props {
    signIn(e: any): Promise<void>;
    handleInput(e: React.ChangeEvent<HTMLInputElement>): void;
}
const { loginContainer, formContainer } = styles


const Form = (props) => {
    const { signIn, handleInput, data, subject } = props
        , d = data?.usuarios && data?.usuarios[0] || {}


        , tableData = Object.entries(d)


    return (
        <div className='customContainer'>
            <h2>Editar {subject}</h2>
            <main className={formContainer}>

                <form onSubmit={signIn}>

                    {
                        tableData.map(([k, v], index) =>
                            k !== 'id' &&
                            <div className="mb-3" key={index}>
                                <label htmlFor={k} className="form-label">{k}</label>
                                <input
                                    name={k}
                                    className="form-control"
                                    //type="email"
                                    id={k}
                                    aria-describedby="emailHelp"
                                    onChange={handleInput}
                                    value={v}
                                />
                            </div>
                        )
                    }

                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </form>
            </main>

        </div>
    )
}

export default Form
