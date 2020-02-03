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

  app.get('/livros', (req, res) =>
    res.send(`
        
      `
    )
  )
}