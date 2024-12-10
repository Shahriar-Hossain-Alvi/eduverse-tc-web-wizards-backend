const express = require("express");
const router = express.Router();

//show users list
router.use("/users", require("./users"));

//show courses list
router.use("/courses", require("./courses"));

//show courseMaterials list
router.use("/courseMaterials", require("./courseMaterials"));

//show CourseFacultyAssignments list
router.use("/CourseFacultyAssignments", require("./CourseFacultyAssignments"));

//show CourseFacultyAssignments list
router.use("/courseStudentEnrollment", require("./courseStudentEnrollment"));


// for student grades
router.use("/studentGrades", require("./studentGrades"));

// for classes
router.use("/classes", require("./classes"));

module.exports = router;
