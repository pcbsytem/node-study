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

  app.get('/livros/form', (req, res) => {
    res.marko(require('../views/livros/form/form.marko'));
  })

  app.post('/livros', (req, res) => {
    console.log(req.body);
    // const livroDao = new LivroDao(db);

    // livroDao.adiciona(req.body)
    //   .then(res => console.log(res))
    //   .catch(error => console.log(error));
  })
}