const express = require('express');
const app = express();
const http = require('http');

app.listen(3001, () => {
  console.log('Servidor roandando na porta 3000');
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>  
        <meta charset="utf-8">
      </head>
      <body>
        <h1>Churi</h1>
      </body>
    </html> 
  `
  );
})

// const servidor = http.createServer((req, res) => {

//   let html = '';
//   if (req.url === '/') {
//     html = `
//       <html>
//         <head>  
//           <meta charset="utf-8">
//         </head>
//         <body>
//           <h1>Home</h1>
//         </body>
//       </html>        
//       `;
//   } else if (req.url === '/livros') {
//     html = `
//       <html>
//         <head>  
//           <meta charset="utf-8">
//         </head>
//         <body>
//           <h1>Livros</h1>
//         </body>
//       </html>        
//     `;
//   }
//   res.end(html);
// });

// servidor.listen(3000);