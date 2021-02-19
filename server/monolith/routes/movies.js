const router = require("express").Router();
const MoviesController = require("../controllers/MoviesController");

router.get("/", MoviesController.read);

router.post("/", MoviesController.create);

router.put("/:id", MoviesController.replace);

router.patch("/:id", MoviesController.update);

router.delete("/:id", MoviesController.delete);

module.exports = router;
