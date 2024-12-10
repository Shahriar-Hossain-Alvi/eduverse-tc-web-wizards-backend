const express = require("express");
const router = express.Router();

// create all course
router.post("/", require("./views/creat-course"));

module.exports = router;
