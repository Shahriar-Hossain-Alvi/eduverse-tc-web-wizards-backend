const express = require("express");
const router = express.Router();

// give grade to a course
router.post("/", require("./view/create-studentGrade"))


// get all grades data
router.get("/", require("./view/get-studentGrades"));

// get single student grades
router.get("/:id", require("./view/get-a-studentGrade"));

// delete a student grade
router.delete("/:id", require("./view/delete-studentGrade"));

// update a student grade
router.patch("/:id", require("./view/update-studentGrade"))

module.exports = router;