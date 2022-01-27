import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { getCustomRepository, Repository } from "typeorm";
import { Usuario } from "../models/Usuario";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { RestauranteService } from "./RestauranteService";


export class UsuarioService {

    private usuarioRepository: Repository<Usuario>

    constructor() {
        this.usuarioRepository = getCustomRepository(UsuarioRepository)
    }

    async list(email: string | undefined) {
        try {
            let where = 'TRUE'

            if (email)
                where = `email = '${email}'`

            const usuarios = await this.usuarioRepository.find({ where, relations: ['restaurante'], order: { nome: 'ASC' } })
            for (let user of usuarios) {
                delete user.password
            }
            return usuarios
        } catch (error) {
            console.log({ error })
        }
    }

    async login(usuario: Usuario) {
        dotenv.config({ path: '../../.env' })

        const
            { email, password } = usuario
            , user = await this.usuarioRepository.findOne({ email })

        if (!user || !user?.email)
            throw new Error('Usuário não encontrado na base de dados.')

        const validatePass = bcrypt.compareSync(password, user.password)

        if (!validatePass)
            throw new Error('Senha inválida.')

        delete user.password
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' })

        return { user, accessToken }
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

        if (usuario.restaurante_id) {
            const restaurante = await new RestauranteService().getRestaurante(usuario.restaurante_id)
            usuario.restaurante = restaurante
        }

        const hashedPass = bcrypt.hashSync(password, 10)
        usuario.password = hashedPass

        const usuarioEntity = this.usuarioRepository.create(usuario)
        await this.usuarioRepository.save(usuarioEntity)
        delete usuarioEntity.password
        return usuarioEntity
    }

    async createMany(usuarios: Usuario[]) {
        const response = []
        try {
            for (let usuario of usuarios) {
                const user = await this.create(usuario)
                response.push(user)
            }
            return response
        } catch (error) {
            console.log(error.message)
            throw new Error('Erro ao criar múltiplos usuarios.')
        }
    }

    async update(usuario: Usuario) {

        const
            { id } = usuario
            , usuarioAtual = await this.usuarioRepository.findOne(id, { relations: ['restaurante'] })

        if (!usuarioAtual)
            throw new Error('Usuario não encontrado na base de dados.')

        if (usuario.restaurante_id) {
            const restaurante = await new RestauranteService().getRestaurante(usuario.restaurante_id)
            usuario.restaurante = restaurante
        }

        const updatedUsuario = await this.usuarioRepository.create({
            ...usuarioAtual, ...usuario
        })
        delete updatedUsuario.password

        //console.log("🚀 ~ file: UsuarioService.ts ~ line 80 ~ UsuarioService ~ update ~ updatedUsuario", updatedUsuario)

        await this.usuarioRepository.save(updatedUsuario);

        return updatedUsuario
    }

    async delete(id: number): Promise<void> {
        console.log("🚀 ~ file: UsuarioService.ts ~ line 95 ~ UsuarioService ~ delete ~ (id", id)
        try {
            await this.usuarioRepository.delete(id)
        } catch (error) {
            console.log(error.message)
            throw new Error('Erro ao apagar o usuario.')
        }
    }

}