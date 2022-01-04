export interface IUsuario {
    id: number
    nome?: string;
    email: string;
    password?: string;
    perfil: string;
    restaurante_id?: number;
    picture?: { data: object };
    name?: string;
}