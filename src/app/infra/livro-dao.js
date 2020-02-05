class LivroDao {
  constructor(db) {
    this._db = db;
  }

  lista(callback) {
    this._db.all(
      'SELECT * FROM livros',
      (error, result) => {
        callback(error, result)
      }
    )
  }
}

module.exports = LivroDao;