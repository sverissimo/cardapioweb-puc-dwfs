import { Request, Response } from "express";
import { UsuarioService } from "../../domain/services/UsuarioService";
import IEntityAssembler from "../assembler/IEntityAssembler";
import { UsuarioAssembler } from "../assembler/UsuarioAssembler";


export class UsuarioController {

    async list(req: Request, res: Response): Promise<Response> {

        const
            usuarioAssembler = new UsuarioAssembler()
            , usuarioService = new UsuarioService()
            , { email } = req.params
            , _usuarios = await usuarioService.list(email)

        const usuarios = _usuarios.map(u => usuarioAssembler.toDTO(u))

        return res.json(usuarios)
    }

    async login(req: Request, res: Response): Promise<void> {

        try {
            const
                usuarioService = new UsuarioService()
                , { user, accessToken } = await usuarioService.login(req.body)

            const usuario = await new UsuarioAssembler().toDTO(user)
            console.log("🚀 ~ file: UsuarioController.ts ~ line 31 ~ UsuarioController ~ login ~ usuario", usuario)

            res.cookie('aToken', accessToken, { maxAge: 1000 * 60 * 60, httpOnly: false })
            res.status(200).json(usuario)

        } catch (error) {
            console.log("🚀 ~ file: UsuarioController.ts ~ line 30 ~ UsuarioController ~ login ~ error", error)
            const { email, password } = req.body
            if (!email)
                res.status(400).send('Favor informar o e-mail.')
            if (!password)
                res.status(400).send('Favor informar a senha.')

            res.status(403).send(error.message)
        }
    }

    async create(req: Request, res: Response): Promise<Response> {

        try {
            const
                usuarioService = new UsuarioService()
                , usuarioAssembler = new UsuarioAssembler()
                , usuario = await usuarioService.create(req.body)
                , usuarioDTO = usuarioAssembler.toDTO(usuario)

            return res.status(201).json(usuarioDTO)

        } catch (e) {
            console.log(e.message)
            return res.status(400).send(e.message)
        }
    }

    /*     async createMany(req: Request, res: Response): Promise<Response> {
    
            try {
                const
                    usuarioService = new UsuarioService()
                    , usuario = await usuarioService.createMany(req.body)
                return res.status(201).json(usuario)
    
            } catch (e) {
                console.log(e.message)
                return res.status(400).send(e.message)
            }
        } */

    async update(req: Request, res: Response): Promise<Response> {
        const
            usuarioService = new UsuarioService()
            , usuarioAssembler = new UsuarioAssembler()
            , usuario = req.body
            , { id } = usuario

        if (!id)
            return res.status(400).send('Usuario não encontrado.')

        try {
            const
                usuarioModel = await usuarioAssembler.toModel(usuario)
                , usuarioAtualizado = await usuarioService.update(usuarioModel)
                , usuarioDTO = usuarioAssembler.toDTO(usuarioAtualizado)

            return res.status(200).json(usuarioDTO)

        } catch (error) {
            return res.send(error?.message)
        }
    }


    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const
                usuarioService = new UsuarioService()
                , { id } = req.params

            if (!id)
                return res.status(400).send('Identificador de usuario inválido.')

            await usuarioService.delete(+id)
            return res.status(204).send('Usuario removida.')

        } catch (error) {
            return res.send(error?.message)
        }
    }
}