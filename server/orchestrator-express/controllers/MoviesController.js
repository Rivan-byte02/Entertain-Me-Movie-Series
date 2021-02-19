const Movies = require("../models/movies");

class MoviesController {
  static async create(req, res) {
    try {
      const movie = await Movies.create(req.body);
      if (movie.error) {
        throw { error: movie.error };
      }
      res.status(201).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async replace(req, res) {
    try {
      const { id } = req.params;
      const movie = await Movies.replace(id, req.body);
      if (movie.error) {
        throw { message: "document not found" };
      }
      res.status(200).json(movie);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const movie = await Movies.update(id, req.body);
      if (movie.error) {
        throw { message: "document not found" };
      }
      res.status(200).json(movie);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await Movies.delete(id);
      if (data.error) {
        throw { message: "document not found" };
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

module.exports = MoviesController;
