const { check } = require('express-validator/check');

class Livro {
  static validacoes() {
    return [
      check('titulo').isLength({ min: 5 }).withMessage('O titulo precisa ter no minino 5 caracteres!'),
      check('preco').isCurrency().withMessage('O preco precisa ter um valor monetario valido!')
    ];
  }
}

module.exports = Livro;