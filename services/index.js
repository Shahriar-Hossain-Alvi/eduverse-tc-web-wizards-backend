const express = require("express");
const router = express.Router();

//Users Route
router.use("/users", require("./users"));

//Courses Route
router.use("/courses", require("./courses"));

//CourseMaterials  Route
router.use("/courseMaterials", require("./courseMaterials"));

//CourseFacultyAssignments Route
router.use("/courseFacultyAssignments", require("./courseFacultyAssignments"));

//CourseStudentEnrollment Route
router.use("/courseStudentEnrollment", require("./courseStudentEnrollment"));

//Student grades Route
router.use("/studentGrades", require("./studentGrades"));

//classes Route
router.use("/classes", require("./classes"));


// class material route
router.use("/classMaterials", require("./classMaterials"))

module.exports = router;
