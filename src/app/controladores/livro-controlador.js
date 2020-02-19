const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

const { validationResult } = require('express-validator/check');

class LivroControlador {
  static rotas() {
    return {
      lista: '/livros',
      cadastro: '/livros/form',
      edicao: '/livros/form/:id',
      delecao: '/livros/:id',
    };
  }

  cadastra() {
    return (req, res) => {
      const livroDao = new LivroDao(db);

      const erros = validationResult(req);

      if (!erros.isEmpty()) {
        return res.marko(
          require('../views/livros/form/form.marko'),
          {
            livro: req.body,
            errosValidacao: erros.array()
          }
        );
      }

      livroDao.adiciona(req.body)
        .then(res.redirect(LivroControlador.rotas().lista))
        .catch(erro => console.log(erro));
    }
  }

  edita() {
    return (req, res) => {
      const livroDao = new LivroDao(db);

      livroDao.atualiza(req.body)
        .then(res.redirect(LivroControlador.rotas().lista))
        .catch(erro => console.log(erro));
    }
  }

  lista() {
    return (req, res) => {
      const livroDao = new LivroDao(db);

      livroDao.lista()
        .then(livros => res.marko(
          require('../views/livros/lista/lista.marko'),
          {
            livros
          }
        ))
        .catch(erro => console.log(erro));
    };
  }

  formularioCadastro() {
    return (req, res) => {
      res.marko(require('../views/livros/form/form.marko'), { livro: {} });
    }
  }

  formularioEdicao() {
    return (req, res) => {
      const { id } = req.params;
      const livroDao = new LivroDao(db);

      livroDao.buscaPorId(id)
        .then(livro =>
          res.marko(
            require('../views/livros/form/form.marko'),
            { livro: livro }
          )
        )
        .catch(erro => console.log(erro));
    }
  }

  remove() {
    return (req, res) => {
      const { id } = req.params;
      const livroDao = new LivroDao(db);

      livroDao.remove(id)
        .then(() => res.status(200).end())
        .catch(erro => console.log(erro));
    }
  }
}

module.exports = LivroControlador;