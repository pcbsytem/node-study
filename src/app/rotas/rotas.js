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
    livroDao.listaLivros((erro, result) => {
      res.marko(
        require('../views/livros/lista/lista.marko'),
        {
          livros: result
        }
      )
    });
  });
}