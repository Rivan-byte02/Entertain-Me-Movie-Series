const { ObjectId } = require("bson");
const TVShow = require("../models/tv-shows");

class TVShowsController {
  static async read(req, res) {
    try {
      const tvShows = await TVShow.find();
      res.status(200).json(tvShows);
    } catch (error) {
      console.log(error);
    }
  }

  static async readOne(req, res) {
    try {
      const { id } = req.params;
      const filter = { _id: ObjectId(id) };
      const tvShows = await TVShow.findOne(filter);
      console.log(tvShows);
      res.status(200).json(tvShows);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async create(req, res) {
    try {
      const tvShow = await TVShow.create(req.body);
      res.status(201).json(tvShow.ops);
    } catch (error) {
      console.log(error);
    }
  }

  static async replace(req, res) {
    try {
      const { id } = req.params;
      const filter = { _id: ObjectId(id) };
      const tvShow = await TVShow.replace(filter, req.body);
      if (tvShow.result.n === 0) {
        throw { message: "document not found" };
      }
      res.status(200).json(tvShow.ops);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const filter = { _id: ObjectId(id) };
      const data = await TVShow.update(filter, req.body);
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
      const data = await TVShow.delete(filter);
      if (data.result.n === 0) {
        throw { message: "document not found" };
      }
      res
        .status(200)
        .json({ message: `${data.result.n} document has been deleted` });
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

module.exports = TVShowsController;
