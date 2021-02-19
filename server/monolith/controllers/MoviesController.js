const { ObjectId } = require("bson");
const Movies = require("../models/movies");

class MoviesController {
  static async read(req, res) {
    try {
      const movies = await Movies.find();
      res.status(200).json(movies);
    } catch (error) {
      console.log(error);
    }
  }

  static async create(req, res) {
    try {
      const movie = await Movies.create(req.body);
      res.status(201).json(movie.ops);
    } catch (error) {
      console.log(error);
    }
  }

  static async replace(req, res) {
    try {
      const { id } = req.params;
      const filter = { _id: ObjectId(id) };
      const movie = await Movies.replace(filter, req.body);
      if (movie.result.n === 0) {
        throw { message: "document not found" };
      }
      res.status(200).json(movie.ops);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const filter = { _id: ObjectId(id) };
      const data = await Movies.update(filter, req.body);
      if (data.result.n === 0) {
        throw { message: "document not found" };
      }
      res
        .status(200)
        .json({ message: `${data.result.n} document has been updated` });
    } catch (error) {
      res.status(404).json(error);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const filter = { _id: ObjectId(id) };
      const data = await Movies.delete(filter);
      if (data.result.n === 0) {
        throw { message: "document not found" };
      }
      res
        .status(200)
        .json({ message: `${data.result.n} document has been updated` });
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

module.exports = MoviesController;
