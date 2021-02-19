const router = require("express").Router();
const moviesRouter = require("./movies");
const tvShowRouter = require("./tv-shows");

router.use("/movies", moviesRouter);

router.use("/tv-shows", tvShowRouter);

module.exports = router;
