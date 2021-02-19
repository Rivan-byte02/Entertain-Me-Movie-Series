const router = require("express").Router();
const moviesRouter = require("./movies");
const tvShowRouter = require("./tv-shows");
const entertainmeRouter = require("./entertainme");

router.use("/entertainme", entertainmeRouter);

router.use("/movies", moviesRouter);

router.use("/tv", tvShowRouter);

module.exports = router;
