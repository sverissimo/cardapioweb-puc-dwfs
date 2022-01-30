import { IUsuario } from "../types/IUsuario";

export default class UsuarioModel implements IUsuario {
    id;
    nome?;
    email;
    password?;
    perfil;
    restaurante: string;
    restaurante_id?;
    picture?;
    name?;

    constructor(props) {
        Object.assign(this, props)
    }

    logUser: (usuario: IUsuario) => void

    toTableModel(usuario: UsuarioModel) {
        const { password, restaurante_id, picture, name, ...usuarioTableModel } = usuario
        return usuarioTableModel
    }

    toFormModel() {

    }
}