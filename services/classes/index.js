const express = require("express");
const router = express.Router();

// create all classes
router.post("/", require("./views/create-classes"));

module.exports = router;