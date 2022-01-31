import { GetStaticPaths, GetStaticProps } from "next"
import React, { useContext, useEffect, useState } from "react"
import Form from "../../components/Form/Form"
import PopUpDialog from "../../components/PopUpDialog/PopUpDialog"
import { UserContext } from "../../contexts/UserContext"
import { Api } from "../../services/api"
import CustomTable from "../../components/Table/CustomTable"
import { filterData } from "../../utils/filterData"
import ExportToExcel from "../../components/ExportToExcel/ExportToExcel"

interface IState {
    openDialog: boolean;
    endPoint: string;
    editedElement: any;
    index: any,
    lookupProps: Array<any>
    lookupTables: Array<any>
    loggedIn: string
    add: boolean
}


export default function Manage(props) {

    const
        { subject } = props
        , api = new Api()
        , [state, setState] = useState<IState>(
            {
                openDialog: false,
                endPoint: '',
                editedElement: undefined,
                index: undefined,
                lookupProps: [],
                lookupTables: [],
                loggedIn: '',
                add: false
            }
        )

    const
        user = useContext(UserContext)
        , loggedIn = user?.email

    useEffect(() => {
        async function createObject(subject: string) {

            try {
                const
                    lookupTables = ['categorias', 'cozinhas', 'formaPagamento', 'restaurantes', 'cidades', 'estados']
                    , lookupProps = ['categoria', 'cozinha', 'formaPagamento', 'restaurante', 'cidade', 'estado']
                    , lookupTableRequests = lookupTables.map(t => api.get(t))
                    , lookupResponse = await Promise.all(lookupTableRequests)
                    , lookupData = {}

                let i = 0
                for (let t of lookupTables) {
                    lookupData[t] = lookupResponse[i]
                    i++
                }

                let data: any

                if (subject === 'restaurantes') {
                    data = lookupData['restaurantes']
                    data = filterData(user, data)
                }
                else
                    data = await api.get(subject)

                if (subject === 'produtos')
                    data = filterData(user, data)

                setState(state => ({ ...state, ...lookupData, [subject]: data, lookupProps, lookupTables, loggedIn }))

            } catch (error) {
                console.log({ error })
            }
        }
        createObject(subject)
    }, [subject, loggedIn])


    const addElement = () => {
        const
            editedElement = state[subject][0]
            , emptyElement = {} as any

        Object.keys(editedElement).forEach(k => {
            emptyElement[k] = ''
        })

        if (subject === 'usuarios')
            emptyElement.password = ''

        if (subject === 'produtos')
            emptyElement.restaurante = state[subject][0].restaurante

        delete emptyElement.id
        setState({ ...state, editedElement: emptyElement, openDialog: true, add: true })
    }

    const editElement = (index: any) => {
        const editedElement = state[subject][index]
        //console.log("🚀 ~ file: [subject].tsx ~ line 96 ~ editElement ~ editedElement", editedElement)
        setState({ ...state, editedElement, openDialog: true, add: false })
    }

    const handleInput = e => {
        const
            { name, value } = e.target
            , editedElement = { ...state.editedElement }

        editedElement[name] = value
        setState({ ...state, editedElement })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const
            { editedElement } = state
            , { id } = editedElement
            , requestData = editedElement

        let response

        if (id)
            response = await api.put(subject, requestData)
        else
            response = await api.post(subject, requestData)

        //O api criado retorna uma string em caso de erro.
        if (typeof response === 'string') {
            alert(response)
            return
        }

        const
            updatedElement = response
            , originalCollection = [...state[subject]]
            , index = originalCollection.findIndex(el => el.id === editedElement.id)

        if (id)
            originalCollection[index] = updatedElement
        else
            originalCollection
                .push(updatedElement)

        const updatedCollection = originalCollection

        setState({ ...state, [subject]: updatedCollection, openDialog: false })
    }


    const deleteElement = async (tableRow: Array<any>) => {

        const
            objId = tableRow.find(e => e.field === 'id')
            , id = objId?.value
        console.log("🚀 ~ file: [subject].tsx ~ line 149 ~ deleteElement ~ tableRow", tableRow)

        await api.delete(`${subject}/${id}`)
            .catch(e => console.log(e))

        const originalCollection = [...state[subject]]
            , updatedCollection = originalCollection.filter(el => el.id !== id)

        setState({ ...state, [subject]: updatedCollection })
    }
    const downloadXls = () => {

    }

    const toggleForm = () => setState({ ...state, openDialog: !state.openDialog })

    if (!state.loggedIn)
        return <h4>É preciso estar logado para acessar essa página.</h4>

    return (
        <div className='customContainer'>
            {
                state[subject] &&
                <>
                    <ExportToExcel
                        data={state[subject]}
                        subject={subject}
                    />
                    <CustomTable
                        collection={state[subject]}
                        title={subject}
                        style={{ width: '300px' }}
                        idIndex={0}
                        editElement={editElement}
                        deleteElement={deleteElement}
                        openEditDialog={toggleForm}
                    />
                </>
            }
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => addElement()}
            >
                <i className="bi bi-plus" style={{ fontSize: '1.2rem' }} />  Adicionar
            </button>

            {state.openDialog &&
                <PopUpDialog close={toggleForm}                >
                    <Form
                        data={state}
                        subject={subject}
                        handleInput={handleInput}
                        handleSubmit={handleSubmit}
                    />
                </PopUpDialog>}
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = (ctx) => {

    const { subject, slug } = ctx.params

    console.log(`Building slug: ${slug}`)

    return {
        props: {
            subject
        }
    }
}