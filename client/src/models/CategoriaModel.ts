export class CategoriaModel {
    id: number;
    nome: string;

    constructor(props) {
        Object.assign(this, props)
    }

    toTableModel(categoria: CategoriaModel) {
        const { ...categoriaTableModel } = categoria
        return categoriaTableModel
    }

    toFormModel(categoria: CategoriaModel): { nome: string; } {
        const { id, ...categoriaTableModel } = categoria
        return categoriaTableModel
    }
}