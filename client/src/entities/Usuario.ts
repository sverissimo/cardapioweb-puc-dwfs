import { IUsuario } from "../types/IUsuario";

export default class Usuario {
    id: number
    nome: string;
    email: string;
    password?: string;
    perfil: string;
    restaurante_id?: number;

    constructor(props) {
        Object.assign(this, props)
    }

    logUser: (usuario: IUsuario) => void
}