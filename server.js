const app = require('./src/config/custom-express');

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});

