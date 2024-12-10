const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// give grade to a course
router.post("/", verifyToken, require("./view/create-studentGrade"))


// get all grades data
router.get("/", verifyToken, require("./view/get-studentGrades"));

// get single student grades
router.get("/:id", verifyToken, require("./view/get-a-studentGrade"));

// delete a student grade
router.delete("/:id", verifyToken, require("./view/delete-studentGrade"));

// update a student grade
router.patch("/:id", verifyToken, require("./view/update-studentGrade"))

module.exports = router;