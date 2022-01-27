import { CategoriaModel } from "../../models/CategoriaModel";
import { FormaPagamentoModel } from "../../models/FormaPagamentoModel";
import { Restaurante } from "../../models/RestauranteModel";
import Usuario from "../../models/UsuarioModel";

export default class FormFactory {

    subject: string
    model: any

    constructor(subject: string) {
        this.subject = subject
    }



    formDataAssembler(data) {

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
        console.log("🚀 ~ file: TableModelFactory.ts ~ line 51 ~ TableModelFactory ~ tableDataAssembler ~ this.model", this.model)
        if (this.model) {
            const dataToReturn = data.map(element => this.model.toTableModel(element))
            return dataToReturn
        }

        return data
    }
}