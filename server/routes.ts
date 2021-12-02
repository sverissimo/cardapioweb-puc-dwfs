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

routes.get('/api/cozinhas', cozinhaController.list)
routes.post('/api/cozinhas', cozinhaController.create)
routes.put('/api/cozinhas', cozinhaController.update)
routes.delete('/api/cozinhas/:id', cozinhaController.delete)

routes.get('/api/restaurantes', restauranteController.list)
routes.get('/api/restaurantes/:id', restauranteController.getRestaurante)
routes.post('/api/restaurantes', restauranteController.create)
routes.put('/api/restaurantes', restauranteController.update)
routes.delete('/api/restaurantes/:id', restauranteController.delete)

routes.get('/api/produtos', produtoController.list)
routes.get('/api/produtos/:id', produtoController.getProduto)
routes.post('/api/produtos', produtoController.create)
routes.post('/api/produtos/createMany', produtoController.createMany)
routes.put('/api/produtos', produtoController.editProduto)
routes.delete('/api/produtos/:id', produtoController.delete)

routes.get('/api/cardapio/:restauranteId', produtoController.getCardapio)

routes.get('/api/formaPagamento', formaPagamentoController.list)
routes.post('/api/formaPagamento', formaPagamentoController.create)
routes.put('/api/formaPagamento', formaPagamentoController.edit)
routes.delete('/api/formaPagamento/:id', formaPagamentoController.delete)

routes.get('/api/categorias', categoriaController.list)
routes.post('/api/categorias', categoriaController.create)
routes.put('/api/categorias', categoriaController.edit)
routes.delete('/api/categorias/:id', categoriaController.delete)

routes.get('/api/usuarios', usuarioController.list)
routes.post('/api/usuarios', usuarioController.create)
routes.put('/api/usuarios', usuarioController.update)
routes.delete('/api/usuarios/:id', usuarioController.delete)
routes.post('/api/login', usuarioController.login)

export { routes }