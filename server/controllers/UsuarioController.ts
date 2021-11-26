import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";


export class UsuarioController {

    async list(req: Request, res: Response): Promise<Response> {
        const
            usuarioService = new UsuarioService()
            , usuarios = await usuarioService.list()

        return res.json(usuarios)
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
}