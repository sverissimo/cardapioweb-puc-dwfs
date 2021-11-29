import { getCustomRepository, Repository } from "typeorm";
import { Usuario } from "../entities/Usuario";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import bcrypt from 'bcrypt'


export class UsuarioService {

    private usuarioRepository: Repository<Usuario>

    constructor() {
        this.usuarioRepository = getCustomRepository(UsuarioRepository)
    }

    async list() {
        try {

            const usuarios = await this.usuarioRepository.find({ relations: ['restaurante'], order: { nome: 'ASC' } })
            for (let user of usuarios) {
                delete user.password
            }
            return usuarios
        } catch (error) {
            console.log({ error })
        }
    }

    async login(usuario: Usuario) {
        const { email, password } = usuario
        const user = await this.usuarioRepository.findOne({ email })

        if (!user || !user?.email)
            throw new Error('Usuário não encontrado na base de dados.')

        const validatePass = bcrypt.compareSync(password, user.password)

        if (!validatePass)
            throw new Error('Senha inválida.')

        delete user.password
        return user
    }

    async create(usuario: Usuario) {

        const
            { email, password } = usuario,
            usuarioExists = await this.usuarioRepository.findOne({ email })
        console.log("🚀 ~ file: UsuarioService.ts ~ line 29 ~ UsuarioService ~ create ~ usuario", usuario)

        if (usuarioExists)
            throw new Error('Usuário já existe na base de dados.')

        if (!password)
            throw new Error('O campo senha é obrigatório.')

        const hashedPass = bcrypt.hashSync(password, 10)
        usuario.password = hashedPass

        const usuarioEntity = this.usuarioRepository.create(usuario)
        await this.usuarioRepository.save(usuarioEntity)
        return usuarioEntity
    }

}