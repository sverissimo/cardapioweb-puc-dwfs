import { GetStaticPaths, GetStaticProps } from "next"
import React, { useEffect, useState } from "react"
import { promises } from "stream"
import Form from "../../components/Form/Form"
import PopUpDialog from "../../components/PopUpDialog/PopUpDialog"
import { IEntity } from "../../entities/IEntity"
import { axiosApi } from "../../services/axiosApi"
import CustomTable from "../../utils/CustomTable"
import { getJoinColumnsName, parseSubmitData } from "../../utils/dtoFilter"
import { Factory } from "../../utils/Factory"

interface IState extends IEntity {
    openDialog: boolean;
    endPoint: string;
    editedElement: any;
    index: any,
    lookupProps: Array<any>
    lookupTables: Array<any>
}

export default function Manage(props) {

    const { subject } = props
    const [state, setState] = useState<IState>(
        {
            openDialog: false,
            endPoint: '',
            editedElement: undefined,
            index: undefined,
            lookupProps: [],
            lookupTables: []
        }
    )

    useEffect(() => {
        async function createObject(subject: string) {
            try {

                const
                    lookupTables = ['categorias', 'cozinhas', 'formaPagamento', 'restaurantes']
                    , lookupProps = ['categoria', 'cozinha', 'formaPagamento', 'restaurante']
                    , lookupTableRequests = lookupTables.map(t => axiosApi.get(t))
                    , lookupResponse = await Promise.all(lookupTableRequests)
                    , lookupData = {}

                let i = 0
                for (let t of lookupTables) {
                    lookupData[t] = lookupResponse[i]?.data
                    i++
                }

                let data

                if (subject === 'restaurantes')
                    data = lookupData['restaurantes']
                else {
                    const response = await axiosApi.get(subject)
                    data = response.data
                }

                const filteredData = getJoinColumnsName(data)

                setState({ ...state, [subject]: filteredData, ...lookupData, lookupProps, lookupTables })
            } catch (error) {
                console.log({ error })
            }
        }
        createObject(subject)
    }, [subject])


    const addElement = () => {
        const
            editedElement = state[subject][0]
            , emptyElement = {} as any

        Object.keys(editedElement).forEach(k => {
            emptyElement[k] = ''
        })

        if (subject === 'usuarios')
            emptyElement.password = ''

        delete emptyElement.id
        setState({ ...state, editedElement: emptyElement, openDialog: true })
    }

    const editElement = (index: any) => {
        const editedElement = state[subject][index]
        console.log("🚀 ~ file: [subject].tsx ~ line 50 ~ editElement ~ editedElement", editedElement)
        setState({ ...state, editedElement, openDialog: true })
    }


    const handleInput = e => {
        const
            { name, value } = e.target
            , editedElement = { ...state.editedElement }
        console.log("🚀 ~ file: [subject].tsx ~ line 78 ~ Manage ~ { name, value }", { name, value })

        editedElement[name] = value
        setState({ ...state, editedElement })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const
            { editedElement } = state
            , { id } = editedElement
            , requestData = parseSubmitData(editedElement, state)

        let response

        if (id)
            response = await axiosApi.put(subject, requestData)
        else
            response = await axiosApi.post(subject, requestData)

        if (response.status <= 200 && response.status > 200) {
            alert(response.data)
            return
        }
        const
            updatedElement = response.data
            , originalCollection = [...state[subject]]
            , index = originalCollection.findIndex(el => el.id === editedElement.id)

        if (id)
            originalCollection[index] = updatedElement
        else
            originalCollection
                .push(updatedElement)

        const updatedCollection = getJoinColumnsName(originalCollection)

        setState({ ...state, [subject]: updatedCollection, openDialog: false })
    }


    const deleteElement = async (objArray: Array<any>) => {

        const
            objId = objArray.find(e => e.field === 'id')
            , id = objId.value

        await axiosApi.delete(`${subject}/${id}`)
            .catch(e => console.log(e))

        const originalCollection = [...state[subject]]
            , updatedCollection = originalCollection.filter(el => el.id !== id)

        setState({ ...state, [subject]: updatedCollection })
    }


    const toggleForm = () => setState({ ...state, openDialog: !state.openDialog })

    return (
        <div className='customContainer'>
            {
                state[subject] &&
                <CustomTable
                    collection={state[subject]}
                    title={subject}
                    style={{ width: '300px' }}
                    idIndex={0}
                    editElement={editElement}
                    deleteElement={deleteElement}
                    openEditDialog={toggleForm}
                />}
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

    const { subject } = ctx.params
    return {
        props: {
            subject
        }
    }
}