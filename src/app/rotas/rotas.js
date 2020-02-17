const { check, validationResult } = require('express-validator/check');

const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

const BaseControlador = require('../controladores/base-controlador');
const baseControlador = new BaseControlador();

const LivroControlador = require('../controladores/livro-controlador');
const livroControlador = new LivroControlador();

module.exports = (app) => {
  app.get('/', baseControlador.home());

  app.get('/livros', livroControlador.lista());

  app.get('/livros/form', livroControlador.formularioCadastro());

  app.get('/livros/form/:id', livroControlador.formularioEdicao());

  app.post('/livros/form', [
    check('titulo').isLength({ min: 5 }).withMessage('O titulo precisa ter no minino 5 caracteres!'),
    check('preco').isCurrency().withMessage('O preco precisa ter um valor monetario valido!')
  ], livroControlador.cadastra())

  app.put('/livros', livroControlador.atualiza())

  app.delete('/livros/:id', livroControlador.remove())
}