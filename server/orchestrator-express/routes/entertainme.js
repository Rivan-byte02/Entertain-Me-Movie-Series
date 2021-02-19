const router = require("express").Router();
const EntertainMeController = require("../controllers/EntertainMeController");

router.get("/", EntertainMeController.read);

module.exports = router;
