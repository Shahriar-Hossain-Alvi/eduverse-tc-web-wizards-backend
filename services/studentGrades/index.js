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

// get student grades by course 
router.get("/course/:id", verifyRole("admin", "faculty", "student"), require("./controllers/get-studentGradesByCourseId"));


// get student grades by student id 
router.get("/student/:id", verifyRole("admin", "faculty", "student"), require("./controllers/get-a-studentGradeByStudentId"));


// get single student grades
router.get("/:id", require("./controllers/get-a-studentGrade"));

// delete a student grade
router.delete("/:id", require("./controllers/delete-studentGrade"));

// delete all grades of a course
router.delete("/deleteAllGrades/:course_id", verifyRole("admin", "faculty"), require("./controllers/delete-allStudentGradeByCourseId"));


// update a student grade
router.patch("/:id", verifyRole("admin", "faculty"), require("./controllers/update-studentGrade"))

module.exports = router;