const { check, validationResult } = require('express-validator/check');

const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
  app.get('/', (req, res) =>
    res.send(`
        <html>
          <head>  
            <meta charset="utf-8">
          </head>
          <body>
            <h1>Bem vindo!</h1>
          </body>
        </html> 
      `
    )
  )

  app.get('/livros', (req, res) => {
    const livroDao = new LivroDao(db);

    livroDao.lista().then(livros => res.marko(
      require('../views/livros/lista/lista.marko'),
      { livros }
    ))
      .catch(error => console.log(error));
  });

  app.get('/livros/form/:id', (req, res) => {
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
  })

  app.get('/livros/form', (req, res) => {
    res.marko(require('../views/livros/form/form.marko'), { livro: {} });
  })

  app.post('/livros', [
    check('titulo').isLength({ min: 5 }),
    check('preco').isCurrency()
  ], (req, res) => {
    const livroDao = new LivroDao(db);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.marko(
        require('../views/livros/form/form.marko'),
        { livro: {} }
      );
    }

    livroDao.adiciona(req.body)
      .then(res.redirect('/livros'))
      .catch(error => console.log(error));
  })

  app.put('/livros', (req, res) => {
    const livroDao = new LivroDao(db);

    livroDao.atualiza(req.body)
      .then(res.redirect('/livros'))
      .catch(error => console.log(error));
  })

  app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;
    const livroDao = new LivroDao(db);

    livroDao.remove(id)
      .then(() => res.status(200).end())
      .catch(error => console.log(error));
  })
}