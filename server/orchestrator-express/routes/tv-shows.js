const router = require("express").Router();
const TVShowsController = require("../controllers/TV-ShowsController");

router.post("/", TVShowsController.create);

router.put("/:id", TVShowsController.replace);

router.patch("/:id", TVShowsController.update);

router.delete("/:id", TVShowsController.delete);

module.exports = router;
