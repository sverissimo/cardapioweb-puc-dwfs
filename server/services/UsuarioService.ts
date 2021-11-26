import { getCustomRepository, Repository } from "typeorm";
import { Usuario } from "../entities/Usuario";
import { UsuarioRepository } from "../repositories/UsuarioRepository";

export class UsuarioService {

    private usuarioRepository: Repository<Usuario>

    constructor() {
        this.usuarioRepository = getCustomRepository(UsuarioRepository)
    }

    async list() {
        const usuarios = await this.usuarioRepository.find({ order: { nome: 'ASC' } })
        return usuarios
    }

    async create(usuario: Usuario) {

        const
            { email } = usuario,
            usuarioExists = await this.usuarioRepository.findOne({ email })

        if (usuarioExists)
            throw new Error('Usuário já existe na base de dados.')

        const usuarioEntity = this.usuarioRepository.create(usuario)
        await this.usuarioRepository.save(usuarioEntity)
        return usuarioEntity
    }

}