const express = require("express");
const router = express.Router();

router.get("/", function (_, res) {
  res.status(200).send("I'm mocker");
});

module.exports = router;
