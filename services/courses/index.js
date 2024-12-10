const express = require("express");
const router = express.Router();

// create all course
router.post("/", require("./views/creat-course"));
// get all course
router.get("/", require("./views/get-course"));
// Get a course by id
router.get("/:id", require("./views/get-a-course"));

module.exports = router;
