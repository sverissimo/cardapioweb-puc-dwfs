export class CozinhaModel {
    id: number;
    nome: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(props: CozinhaModel) {
        Object.assign(this, props)
    }

    toTableModel(cozinha: CozinhaModel) {
        const { created_at, updated_at, ...cozinhaTableModel } = cozinha
        return cozinhaTableModel
    }

    toFormModel(cozinha: CozinhaModel): { nome: string; } {
        const { id, created_at, updated_at, ...cozinhaFormModel } = cozinha
        console.log("🚀 ~ file: CozinhaModel.ts ~ line 20 ~ CozinhaModel ~ toFormModel ~ cozinhaFormModel", cozinhaFormModel)
        return cozinhaFormModel
    }
}