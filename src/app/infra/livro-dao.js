class LivroDao {
  constructor(db) {
    this._db = db;
  }

  lista() {
    return new Promise((resolve, reject) => {
      this._db.all(
        'SELECT * FROM livros',
        (error, result) => {
          if (error) return reject("Falha ao listar os livros!");
          return resolve(result);
        }
      )
    });
  }

  adiciona(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(`
          INSERT INTO livros (
            titulo,
            preco,
            descricao
          ) values (?,?,?)
        `, [
        livro.titulo,
        livro.preco,
        livro.descricao
      ], (err) => {
        if (err) {
          console.log(err);
          return reject('Nao foi possivel adicionar o livro!');
        }

        return resolve();
      })
    });
  }

  buscaPorId(id) {
    return new Promise((resolve, reject) => {
      this._db.all(
        `SELECT * FROM livros WHERE id=${id}`,
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      )
    });
  }

  atualiza(livro) {
    return new Promise(() => {
      this._db.run(`
        UPDATE livros 
        SET 
          titulo = ${livro.titulo} 
          preco = ${livro.preco} 
          descricao = ${livro.descricao}
        WHERE id = ${livro.id}
      `, (err) => {
        if (err) {
          return reject('Não foi possível atualizar este livro!');
        }

        return resolve();
      })
    });
  }


}

module.exports = LivroDao;