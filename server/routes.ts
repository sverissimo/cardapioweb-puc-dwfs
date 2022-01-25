import { Router } from "express";
import { CozinhaController } from "./api/controllers/CozinhaController";
import { ProdutoController } from "./api/controllers/ProdutoController";
import { RestauranteController } from "./api/controllers/RestauranteController";
import cors from 'cors'
import { UsuarioController } from "./api/controllers/UsuarioController";
import { FormaPagamentoController } from "./api/controllers/FormaPagamentoController";
import { CategoriaController } from "./api/controllers/CategoriasController";
import { CidadeController } from "./api/controllers/CidadeController";

const routes = Router();
routes.use(cors())


const
    restauranteController = new RestauranteController()
    , cozinhaController = new CozinhaController()
    , produtoController = new ProdutoController()
    , usuarioController = new UsuarioController()
    , formaPagamentoController = new FormaPagamentoController()
    , categoriaController = new CategoriaController()
    , cidadeController = new CidadeController()

routes.route('/api/cozinhas')
    .get(cozinhaController.list)
    .post(cozinhaController.create)
    .put(cozinhaController.update)
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

routes
    .route('/api/cidades')
    .get(cidadeController.list)

routes.get('/api/usuarios/:email?', usuarioController.list)
routes.post('/api/usuarios', usuarioController.create)
routes.post('/api/usuariosMany', usuarioController.createMany)
routes.put('/api/usuarios', usuarioController.update)
routes.delete('/api/usuarios/:id', usuarioController.delete)
routes.post('/api/login', usuarioController.login)

export { routes }