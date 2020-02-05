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
}

module.exports = LivroDao;