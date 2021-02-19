const Movies = require("../models/movies");
const TVShows = require("../models/tv-shows");
const Redis = require("ioredis");
const redis = new Redis();

class EntertainMeController {
  static async read(req, res) {
    try {
      const tvShowsData = await redis.get("tv:data");
      const moviesData = await redis.get("movies:data");
      if (tvShowsData && moviesData) {
        console.log("dari cache redis");
        res.status(200).json({
          movies: JSON.parse(moviesData),
          tvSeries: JSON.parse(tvShowsData),
        });
      } else {
        console.log("dari axios");
        const movies = await Movies.find();
        const tvShows = await TVShows.find();
        if (movies.error) {
          throw { error: movies.error };
        }
        if (tvShows.error) {
          throw { error: tvShows.error };
        }
        res.status(200).json({
          movies,
          tvSeries: tvShows,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = EntertainMeController;
