import { Router } from "express";
import { CozinhaController } from "./controllers/CozinhaController";
import { ProdutoController } from "./controllers/ProdutoController";
import { RestauranteController } from "./controllers/RestauranteController";
import cors from 'cors'
import { UsuarioController } from "./controllers/UsuarioController";
import { FormaPagamentoController } from "./controllers/FormaPagamentoController";
import { CategoriaController } from "./controllers/CategoriasController";

const routes = Router();
routes.use(cors())


const
    restauranteController = new RestauranteController()
    , cozinhaController = new CozinhaController()
    , produtoController = new ProdutoController()
    , usuarioController = new UsuarioController()
    , formaPagamentoController = new FormaPagamentoController()
    , categoriaController = new CategoriaController()

routes.get('/cozinhas', cozinhaController.list)
routes.post('/cozinhas', cozinhaController.create)
routes.put('/cozinhas', cozinhaController.update)
routes.delete('/cozinhas/:id', cozinhaController.delete)

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

routes.get('/formaPagamento', formaPagamentoController.list)
routes.post('/formaPagamento', formaPagamentoController.create)
routes.put('/formaPagamento', formaPagamentoController.edit)
routes.delete('/formaPagamento/:id', formaPagamentoController.delete)

routes.get('/categorias', categoriaController.list)
routes.post('/categorias', categoriaController.create)
routes.put('/categorias', categoriaController.edit)
routes.delete('/categorias/:id', categoriaController.delete)

routes.get('/usuarios', usuarioController.list)
routes.post('/usuarios', usuarioController.create)
routes.post('/login', usuarioController.login)

export { routes }