export type UsuarioCreateDTO = {
    id: number
    nome: string;
    email: string;
    perfil: string;
    password?: string;
    restaurante?: string
}