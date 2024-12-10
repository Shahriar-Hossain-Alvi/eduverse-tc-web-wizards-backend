const express = require("express");
const router = express.Router();

// create all course
router.post("/", require("./views/creat-course"));
// get all course
router.get("/", require("./views/get-course"));
// Get a course by id
router.get("/:id", require("./views/get-a-course"));
// delete a course by id
router.delete("/:id", require("./views/delete-course"));
// update a course by id
router.patch("/:id", require("./views/update-course"))

module.exports = router;
