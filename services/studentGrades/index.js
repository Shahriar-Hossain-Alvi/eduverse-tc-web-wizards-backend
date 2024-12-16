const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// give grade to a course
router.post("/", require("./controllers/create-studentGrade"))


// get all grades data
router.get("/", require("./controllers/get-studentGrades"));

// get single student grades
router.get("/:id", require("./controllers/get-a-studentGrade"));

// delete a student grade
router.delete("/:id", require("./controllers/delete-studentGrade"));

// update a student grade
router.patch("/:id", require("./controllers/update-studentGrade"))

module.exports = router;