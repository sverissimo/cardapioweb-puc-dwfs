import { capitalize } from '../../utils/capitalize'
import { renderData } from '../../utils/dtoFilter'
import styles from './login.module.scss'
import { inputOptions } from './selectInputs'

interface Props {
    signIn(e: any): Promise<void>;
    handleInput(e: React.ChangeEvent<HTMLInputElement>): void;
}

const { formContainer } = styles

const Form = (props) => {
    const { handleInput, data, subject, handleSubmit } = props
        , { editedElement, add } = data

        , formElement = editedElement
        , formData = formElement && Object.keys(formElement)
        , selectInputs = Object.keys(inputOptions(data))
        , options = inputOptions(data)

    console.log("🚀 ~ file: Form.tsx ~ line 18 ~ Form ~ editedElement", editedElement)


    return (
        <div className='customContainer'>
            <h2>{add ? 'Adicionar' : 'Editar'} {subject}</h2>
            <main className={formContainer}>

                <form onSubmit={e => handleSubmit(e)}>
                    {
                        formData && formData.map((key, index) =>
                            key !== 'id' && !key.match('Id') &&
                            <div className="mb-3" key={index}>
                                {
                                    !selectInputs.includes(key) ?
                                        <>
                                            <label htmlFor={key} className="form-label">{capitalize(key)}</label>
                                            <input
                                                name={key}
                                                className="form-control"
                                                type={key === "email" ? "email" : "text"}
                                                id={key}
                                                style={{ width: '350px' }}
                                                aria-describedby="emailHelp"
                                                onChange={e => handleInput(e)}
                                                value={editedElement[key] || ''}
                                                required={key !== 'complemento'}
                                            />
                                        </>
                                        :
                                        <>
                                            <label htmlFor={key} className="form-label">{capitalize(key)}</label>
                                            <select
                                                id={key}
                                                name={key}
                                                className="form-select"
                                                aria-label={key}
                                                onChange={e => handleInput(e)}
                                                defaultValue={editedElement[key]}
                                            >
                                                {/* <option selected>{editedElement[key]}</option> */}
                                                {
                                                    options[key].map((opt, i) =>
                                                        <option key={opt}
                                                            value={opt}
                                                            defaultValue={editedElement[key]}
                                                        >{opt}
                                                        </option>
                                                    )
                                                }
                                            </select>
                                        </>
                                }
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
