const express = require("express");
const router = express.Router();

//Users Route
router.use("/users", require("./users"));

//Courses Route
router.use("/courses", require("./courses"));

//CourseMaterials Route
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


// class attendance route
router.use("/classAttendance", require("./classAttendance"));


//  quick overview
router.use("/quickOverview", require("./quickOverview"));



// deleted materials route
router.use("/deletedMaterials", require("./deletedMaterials"))


// otp send
router.use("/otp", require("./sendOtp"));


module.exports = router;
