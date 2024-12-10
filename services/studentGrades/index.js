const express = require("express");
const router = express.Router();

// give grade to a course
router.post("/", require("./view/create-studentGrade"))


// get all grades data
router.get("/", require("./view/get-studentGrades"));

// get single student grades
router.get("/:id", require("./view/get-a-studentGrade"));

module.exports = router;