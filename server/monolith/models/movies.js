const { getDatabase } = require("../config/mongodb");

class Movies {
  static async find() {
    return getDatabase().collection("movies").find().toArray();
  }

  static async create(movie) {
    return getDatabase().collection("movies").insertOne(movie);
  }

  static async replace(filter, movie) {
    return getDatabase().collection("movies").replaceOne(filter, movie);
  }

  static async update(filter, movie) {
    return getDatabase().collection("movies").updateOne(filter, movie);
  }

  static async delete(filter) {
    return getDatabase().collection("movies").deleteOne(filter);
  }
}

module.exports = Movies;
