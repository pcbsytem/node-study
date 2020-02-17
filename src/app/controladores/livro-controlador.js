class LivroControlador {
  lista() {
    return (req, res) => {
      const livroDao = new LivroDao(db);

      livroDao.lista().then(livros => res.marko(
        require('../views/livros/lista/lista.marko'),
        { livros }
      ))
        .catch(error => console.log(error));
    }
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
        .catch(error => console.log(error));
    }
  }

  cadastra() {
    return (req, res) => {
      const livroDao = new LivroDao(db);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.marko(
          require('../views/livros/form/form.marko'),
          {
            livro: req.body,
            errosValidacao: errors.array()
          }
        );
      }

      livroDao.adiciona(req.body)
        .then(res.redirect('/livros'))
        .catch(error => console.log(error));
    }
  }

  atualiza() {
    return (req, res) => {
      const livroDao = new LivroDao(db);

      livroDao.atualiza(req.body)
        .then(res.redirect('/livros'))
        .catch(error => console.log(error));
    }
  }

  remove() {
    return (req, res) => {
      const { id } = req.params;
      const livroDao = new LivroDao(db);

      livroDao.remove(id)
        .then(() => res.status(200).end())
        .catch(error => console.log(error));
    }
  }
}

module.exports = LivroControlador;