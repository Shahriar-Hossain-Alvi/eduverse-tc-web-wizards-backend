const express = require("express");
const router = express.Router();

// create all classes
router.post("/", require("./views/create-classes"));

// get all classes
router.get("/", require("./views/get-classes"));

// get all classes
router.get("/:id", require("./views/get-a-classes"));

module.exports = router;