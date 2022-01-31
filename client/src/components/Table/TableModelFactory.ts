import { CategoriaModel } from "../../models/CategoriaModel"
import { FormaPagamentoModel } from "../../models/FormaPagamentoModel"
import { RestauranteModel } from "../../models/RestauranteModel"
import UsuarioModel from "../../models/UsuarioModel"
import editDeleteFields from "./editDeleteFields"

export class TableModelFactory {

    subject: string
    model: any

    constructor(subject: string) {
        this.subject = subject
    }

    create(collection: any[]) {
        collection = this.tableDataAssembler(collection)

        const
            tableHeaders = this.createHeader(collection)
            , arrayOfRows = []

        collection.forEach(entity => {


            const
                entityProps = Object.keys(entity)
                , missingProps = tableHeaders.filter(header => !entityProps.includes(header.toLowerCase()))

            missingProps.forEach(prop => entity[prop] = '')

            arrayOfRows.push(
                Object.entries(entity).map(([k, v]) => ({
                    field: k,
                    title: k,
                    value: v
                }))
            )
        });

        tableHeaders.push('Editar', 'Remover')
        arrayOfRows.forEach(e => e.push(...editDeleteFields))

        const length = tableHeaders.length

        return { tableHeaders, arrayOfRows, length }
    }

    createHeader(collection: any[]): string[] {
        const headers = new Set<string>()
        collection.forEach(obj => Object
            .keys(obj)
            .forEach(k => headers.add(k))
        )

        const tableHeaders = Array
            .from(headers)
            .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())

        return tableHeaders
    }

    tableDataAssembler(data) {

        switch (this.subject) {
            case 'restaurantes':
                this.model = new RestauranteModel({})
                break;
            case 'usuarios':
                this.model = new UsuarioModel({})
                break;
            case 'formaPagamento':
                this.model = new FormaPagamentoModel({})
                break;
            case 'categorias':
                this.model = new CategoriaModel({})
                break;
            default:
                void 0
        }

        if (this.model) {

            const dataToReturn = data.map(element => this.model.toTableModel(element))
            return dataToReturn
        }

        return data
    }
}