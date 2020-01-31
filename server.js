const app = require('./src/config/custom-express');

app.listen(3001, () => {
  console.log('Servidor roandando na porta 3000');
});

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

app.get('/livros', (req, res) =>
  res.send(`
    <html>
      <head>  
        <meta charset="utf-8">
      </head>
      <body>
        <h1>Livros</h1>
      </body>
    </html> 
  `
  )
)