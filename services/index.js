const express = require("express");
const router = express.Router();

//Users Route
router.use("/users", require("./users"));

//Courses Route
router.use("/courses", require("./courses"));

//CourseMaterials  Route
router.use("/courseMaterials", require("./courseMaterials"));

//CourseFacultyAssignments Route
router.use("/CourseFacultyAssignments", require("./CourseFacultyAssignments"));

//CourseStudentEnrollment Route
router.use("/courseStudentEnrollment", require("./courseStudentEnrollment"));

//Student grades Route
router.use("/studentGrades", require("./studentGrades"));

//classes Route
router.use("/classes", require("./classes"));

module.exports = router;
