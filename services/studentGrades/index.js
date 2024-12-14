const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// give grade to a course
router.post("/", verifyToken, require("./controllers/create-studentGrade"))


// get all grades data
router.get("/", verifyToken, require("./controllers/get-studentGrades"));

// get single student grades
router.get("/:id", verifyToken, require("./controllers/get-a-studentGrade"));

// delete a student grade
router.delete("/:id", verifyToken, require("./controllers/delete-studentGrade"));

// update a student grade
router.patch("/:id", verifyToken, require("./controllers/update-studentGrade"))

module.exports = router;