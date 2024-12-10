const express = require("express");
const router = express.Router();

// crate new course material
router.post("/", require("./view/create-courseMaterial"));


// get all course material
router.get("/", require("./view/get-courseMaterial"));


module.exports = router;