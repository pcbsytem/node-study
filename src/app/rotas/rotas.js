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

  app.get('/livros/:id', (req, res) => {
    console.log(req.params.id)
    const livroDao = new LivroDao(db);

    livroDao.buscaPorId(req.params.id).then(livros => res.marko(
      require('../views/livros/lista/lista.marko'),
      { livros }
    ))
      .catch(error => console.log(error));
  })

  app.get('/livros/form', (req, res) => {
    res.marko(require('../views/livros/form/form.marko'));
  })

  app.post('/livros', (req, res) => {
    console.log(req.body);
    const livroDao = new LivroDao(db);

    livroDao.adiciona(req.body)
      .then(res.redirect('/livros'))
      .catch(error => console.log(error));
  })

  app.put('/livros/:id', (req, res) => {
    const livroDao = new LivroDao(db);
    console.log(req)
    const livro = { ...req.body, id: req.params.id };

    livroDao.atualiza(livro)
      .then(res.redirect('/livros'))
      .catch(error => console.log(error));
  })

  app.delete('/livros/:id', (req, res) => {
    const id = req.params.id;
    const livroDao = new LivroDao(db);

    livroDao.remove(id)
      .then(res => res.status(200).end())
      .catch(error => console.log(error));
  })
}