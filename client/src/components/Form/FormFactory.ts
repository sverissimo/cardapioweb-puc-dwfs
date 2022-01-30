import { CategoriaModel } from "../../models/CategoriaModel";
import { FormaPagamentoModel } from "../../models/FormaPagamentoModel";
import { RestauranteModel } from "../../models/RestauranteModel";
import Usuario from "../../models/UsuarioModel";
import { inputOptions } from "./selectInputs";

export default class FormFactory {

    subject: string
    model: any
    data: any

    constructor(subject: string, data: any) {
        this.subject = subject
        this.data = data
    }

    create() {

        switch (this.subject) {
            case 'restaurantes':
                this.model = new RestauranteModel({})
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
        //if (this.model) { }
        const formFieldsSet = new Set<string>()

        //Cria os campos do formulário
        for (let f of this.data[this.subject]) {
            Object
                .keys(f)
                .forEach(k => formFieldsSet.add(k))
        }

        const
            formFields = Array.from(formFieldsSet)
            , selectInputs = Object.keys(inputOptions(this.data))
            , options = inputOptions(this.data)

        if (this.data.add && this.subject === 'usuarios') {
            formFields.push('password')
            selectInputs.unshift('')
        }

        return { formFields, selectInputs, options }

    }
}