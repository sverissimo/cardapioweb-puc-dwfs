import { CategoriaModel } from "../../models/CategoriaModel"
import { FormaPagamentoModel } from "../../models/FormaPagamentoModel"
import { Restaurante } from "../../models/RestauranteModel"
import Usuario from "../../models/UsuarioModel"
import editDeleteFields from "./editDeleteFields"

export class TableModelFactory {

    subject: string
    model: any

    constructor(subject: string) {
        this.subject = subject
    }

    toTable(collection: any[]) {
        collection = this.tableDataAssembler(collection)

        const
            tableHeaders = this.createHeader(collection)
            , arrayOfRows = []
            , length = tableHeaders.length

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
                this.model = new Restaurante({})
                break;
            case 'usuarios':
                this.model = new Usuario({})
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