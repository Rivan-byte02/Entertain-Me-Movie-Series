const TVShows = require("../models/tv-shows");

class TVShowsController {
  static async create(req, res) {
    try {
      const tvShow = await TVShows.create(req.body);
      if (tvShow.error) {
        throw { error: tvShow.error };
      }
      res.status(201).json(tvShow);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async replace(req, res) {
    try {
      const { id } = req.params;
      const tvShow = await TVShows.replace(id, req.body);
      if (tvShow.error) {
        throw { message: "document not found" };
      }
      res.status(200).json(tvShow);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const data = await TVShows.update(id, req.body);
      if (tvShow.error) {
        throw { message: "document not found" };
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await TVShows.delete(id);
      if (tvShow.error) {
        throw { message: "document not found" };
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

module.exports = TVShowsController;
