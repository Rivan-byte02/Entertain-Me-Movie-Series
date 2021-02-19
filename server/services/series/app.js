const express = require("express");
const app = express();
const port = process.env.PORT || 4002;
const { connect } = require("./config/mongodb");
const router = require("./routes/index");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(router);

connect().then(async (db) => {
  app.listen(port, () => {
    console.log("Runnning at port,", port);
  });
});
