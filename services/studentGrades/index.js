const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware");
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware");

// Apply middleware globally for all remaining routes
router.use(verifyToken)

// give grade to a course
router.post("/", verifyRole("admin", "faculty"), require("./controllers/create-studentGrade"))

// get all grades data
router.get("/", require("./controllers/get-studentGrades"));

// get single student grades by course 
router.get("/course/:id", require("./controllers/get-studentGradesByCourseId"));


// get single student grades
router.get("/:id", require("./controllers/get-a-studentGrade"));

// delete a student grade
router.delete("/:id", require("./controllers/delete-studentGrade"));

// update a student grade
router.patch("/:id", require("./controllers/update-studentGrade"))

module.exports = router;