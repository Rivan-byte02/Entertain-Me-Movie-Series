const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class TVShow {
  static async find() {
    try {
      const { data } = await axios.get("http://localhost:4002/tv");
      const tv = data;
      redis.set("tv:data", JSON.stringify(tv));
      return tv;
    } catch (error) {
      return { error };
    }
  }

  static async create(input) {
    try {
      await redis.del("tv:data");
      const movie = await axios.post("http://localhost:4002/tv", input);
      return movie.data;
    } catch (error) {
      return { error };
    }
  }

  static async replace(id, input) {
    try {
      await redis.del("tv:data");
      const movie = await axios.put(`http://localhost:4002/tv/${id}`, input);
      return movie.data;
    } catch (error) {
      return error;
    }
  }

  static async update(id, input) {
    try {
      await redis.del("tv:data");
      const movie = await axios.patch(`http://localhost:4002/tv/${id}`, input);
      return movie.data;
    } catch (error) {
      return { error };
    }
  }

  static async delete(id) {
    try {
      await redis.del("tv:data");
      const movie = await axios.delete(`http://localhost:4002/tv/${id}`);
      return movie.data;
    } catch (error) {
      return { error };
    }
  }
}

module.exports = TVShow;
