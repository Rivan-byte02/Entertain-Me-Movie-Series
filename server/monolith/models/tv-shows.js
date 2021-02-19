const { getDatabase } = require("../config/mongodb");

class TVShow {
  static async find() {
    return getDatabase().collection("tv-shows").find().toArray();
  }

  static async create(tvShow) {
    return getDatabase().collection("tv-shows").insertOne(tvShow);
  }

  static async replace(filter, tvShow) {
    return getDatabase().collection("tv-shows").replaceOne(filter, tvShow);
  }

  static async update(filter, tvShow) {
    return getDatabase().collection("tv-shows").updateOne(filter, tvShow);
  }

  static async delete(filter) {
    return getDatabase().collection("tv-shows").deleteOne(filter);
  }
}

module.exports = TVShow;
