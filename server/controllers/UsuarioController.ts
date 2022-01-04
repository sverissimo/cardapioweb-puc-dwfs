import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";


export class UsuarioController {

    async list(req: Request, res: Response): Promise<Response> {

        const
            usuarioService = new UsuarioService()
            , { email } = req.params

            , usuarios = await usuarioService.list(email)

        return res.json(usuarios)
    }

    async login(req: Request, res: Response): Promise<void> {

        try {
            const
                usuarioService = new UsuarioService()
                , { user, accessToken } = await usuarioService.login(req.body)

            //res.status(200).json({ accessToken })
            res.cookie('aToken', accessToken, { maxAge: 1000 * 60 * 60, httpOnly: false })
            res.status(200).json(user)

        } catch (error) {
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