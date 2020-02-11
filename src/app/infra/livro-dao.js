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
        `SELECT * FROM livros WHERE id=?`,
        [id],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result[0]);
        }
      )
    });
  }

  atualiza(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        UPDATE livros SET 
          titulo = ?,
          preco = ?,
          descricao = ?
        WHERE id = ?
      `,
        [
          livro.titulo,
          livro.preco,
          livro.descricao,
          livro.id
        ],
        (err) => {
          if (err) {
            return reject(`Não foi possível atualizar este livro! ${err}`);
          }

          return resolve();
        })
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `DELETE FROM livros WHERE id=?`,
        [id],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      )
    })
  }
}

module.exports = LivroDao;