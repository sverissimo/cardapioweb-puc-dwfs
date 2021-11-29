import { GetStaticPaths, GetStaticProps } from "next"
import React, { useEffect, useState } from "react"
import Form from "../../components/Form/Form"
import PopUpDialog from "../../components/PopUpDialog/PopUpDialog"
import { IEntity } from "../../entities/IEntity"
import { axiosApi } from "../../services/axiosApi"
import CustomTable from "../../utils/CustomTable"
import { Factory } from "../../utils/Factory"

interface IState extends IEntity {
    openDialog: boolean;
    endPoint: string;
}

export default function Manage(props) {

    const { subject } = props
    const [state, setState] = useState<IState>({ openDialog: true, endPoint: '' })

    useEffect(() => {

        async function createObject(subject: string) {
            try {

                const
                    response = await axiosApi.get(subject)
                    , { data } = response
                //, entity = new Factory().create(props.subject, response.data)                

                setState({ ...state, [subject]: data })
            } catch (error) {
                console.log({ error })
            }
        }
        createObject(subject)
    }, [subject])

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
                    deleteFunction={() => console.log('del')}
                    openEditDialog={() => console.log('edit')}

                />}

            {state.openDialog &&
                <PopUpDialog close={toggleForm}                >
                    <Form
                        data={state}
                        subject={subject}
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