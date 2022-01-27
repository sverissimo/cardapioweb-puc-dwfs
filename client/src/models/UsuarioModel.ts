import { IUsuario } from "../types/IUsuario";

export default class Usuario implements IUsuario {
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

    toTableModel(usuario: Usuario) {
        const { id, password, restaurante_id, picture, name, ...usuarioTableModel } = usuario
        return usuarioTableModel
    }
}