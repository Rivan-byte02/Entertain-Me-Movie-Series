const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class Movies {
  static async find() {
    try {
      const { data } = await axios.get("http://localhost:4001/movies");
      const movies = data;
      redis.set("movies:data", JSON.stringify(movies));
      return movies;
    } catch (error) {
      return { error };
    }
  }

  static async create(input) {
    try {
      await redis.del("movies:data");
      const movie = await axios.post("http://localhost:4001/movies", input);
      return movie.data;
    } catch (error) {
      return { error };
    }
  }

  static async replace(id, input) {
    try {
      await redis.del("movies:data");
      const { data } = await axios.put(
        `http://localhost:4001/movies/${id}`,
        input
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  static async update(id, input) {
    try {
      await redis.del("movies:data");
      console.log(input);
      const { data } = await axios.patch(
        `http://localhost:4001/movies/${id}`,
        input
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  static async delete(id) {
    try {
      await redis.del("movies:data");
      const { data } = await axios.delete(`http://localhost:4001/movies/${id}`);
      return data;
    } catch (error) {
      return { error };
    }
  }
}

module.exports = Movies;
