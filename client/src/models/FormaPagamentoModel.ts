export class FormaPagamentoModel {
    id: number;
    descricao: string;

    constructor(props) {
        Object.assign(this, props)
    }

    toTableModel(formaPagamento: FormaPagamentoModel) {
        const { id, ...formaPagamentoTableModel } = formaPagamento
        return formaPagamentoTableModel
    }

    toFormModel(formaPagamento: FormaPagamentoModel) {
        const { id, ...formaPagamentoTableModel } = formaPagamento
        return formaPagamentoTableModel
    }
}