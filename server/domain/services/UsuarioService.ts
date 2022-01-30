import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { getCustomRepository, Repository } from "typeorm";
import { Usuario } from "../models/Usuario";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { RestauranteService } from "./RestauranteService";
import { UsuarioDTO } from '../../types/usuarioDTO.type';
import { UsuarioCreateDTO } from '../../types/usuarioCreateDTO.type';


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

    async create(usuario: UsuarioCreateDTO) {

        const
            { email, password } = usuario
            , usuarioExists = await this.usuarioRepository.findOne({ email })

        if (usuarioExists)
            throw new Error('Usuário já existe na base de dados.')

        if (!password)
            throw new Error('O campo senha é obrigatório.')


        const
            restaurante = await new RestauranteService().findByName(usuario.restaurante)
            , hashedPass = bcrypt.hashSync(password, 10)
            , usuarioModel = {
                ...usuario,
                password: hashedPass,
                restaurante
            }

        const usuarioEntity: Usuario = this.usuarioRepository.create(usuarioModel)
        await this.usuarioRepository.save(usuarioEntity)
        delete usuarioEntity.password
        return usuarioEntity
    }

    /*     async createMany(usuarios: Usuario[]) {
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
        } */

    async update(usuario: Usuario) {

        const
            { id } = usuario
            , usuarioAtual = await this.usuarioRepository.findOne(id)

        if (!usuarioAtual)
            throw new Error('Usuario não encontrado na base de dados.')

        if (usuario.perfil === 'admin') {
            usuario.restaurante_id = null
            delete usuario.restaurante
        }

        const updatedUsuario = await this.usuarioRepository.create({
            ...usuarioAtual, ...usuario
        })

        delete updatedUsuario.password

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