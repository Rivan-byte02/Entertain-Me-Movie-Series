const router = require("express").Router();
const tvShowRouter = require("./tv-shows");

router.use("/tv", tvShowRouter);

module.exports = router;
