import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";


export class UsuarioController {

    async list(req: Request, res: Response): Promise<Response> {
        const
            usuarioService = new UsuarioService()
            , usuarios = await usuarioService.list()

        return res.json(usuarios)
    }

    async login(req: Request, res: Response): Promise<Response> {

        try {
            const
                usuarioService = new UsuarioService()
                , usuario = await usuarioService.login(req.body)
            return res.status(200).json(usuario)

        } catch (error) {
            const { email, password } = req.body
            if (!email)
                return res.status(400).send('Favor informar o e-mail.')
            if (!password)
                return res.status(400).send('Favor informar a senha.')

            return res.status(403).send(error.message)
        }
    }

    async create(req: Request, res: Response): Promise<Response> {

        try {
            const
                usuarioService = new UsuarioService()
                , usuario = await usuarioService.create(req.body)
            return res.status(201).json(usuario)

        } catch (e) {
            console.log(e.message)
            return res.status(400).send(e.message)
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const
            usuarioService = new UsuarioService()
            , usuario = req.body
            , { id } = usuario

        if (!id)
            return res.status(400).send('Usuario não encontrado.')

        try {
            const usuarioAtual = await usuarioService.update(usuario);
            return res.status(200).json(usuarioAtual)
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