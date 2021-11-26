import { Router } from "express";
import { CozinhaController } from "./controllers/CozinhaController";
import { ProdutoController } from "./controllers/ProdutoController";
import { RestauranteController } from "./controllers/RestauranteController";
import cors from 'cors'
import { UsuarioController } from "./controllers/UsuarioController";

const routes = Router();
routes.use(cors())


const
    restauranteController = new RestauranteController()
    , cozinhaController = new CozinhaController()
    , produtoController = new ProdutoController()
    , usuarioController = new UsuarioController()

routes.get('/cozinhas', cozinhaController.list)
routes.post('/cozinhas', cozinhaController.create)

routes.get('/restaurantes', restauranteController.list)
routes.get('/restaurantes/:id', restauranteController.getRestaurante)
routes.post('/restaurantes', restauranteController.create)
routes.put('/restaurantes', restauranteController.update)
routes.delete('/restaurantes/:id', restauranteController.delete)

routes.get('/produtos', produtoController.list)
routes.get('/produtos/:id', produtoController.getProduto)
routes.post('/produtos', produtoController.createMany)
routes.put('/produtos', produtoController.editProduto)

routes.get('/cardapio/:restauranteId', produtoController.getCardapio)

routes.get('/usuarios', usuarioController.list)
routes.post('/usuarios', usuarioController.create)

export { routes }