const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware");
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware");


// Apply middleware globally for all remaining routes
router.use(verifyToken)

// create a courseStudentEnrollment => used in course enrollment
router.post("/", verifyRole("student"), require("./controllers/create-courseStudentEnrollment"));



// get all courseStudentEnrollment
router.get("/", require("./controllers/get-courseStudentEnrollment"));



// get student enrollment list for a course => for admin and faculty 
router.get("/enrollmentList/:id", verifyRole("admin", "faculty"), require("./controllers/get-allStudentEnrollmentFor-a-course"));




// get enrolled courses for a single student => My Courses (Student)
router.get("/myEnrolledCourses/:student_id", verifyRole("student"), require("./controllers/get-singleStudentEnrolledCourses"));



// get a courseStudentEnrollment => get the enrolled courses details
router.get("/:id", verifyRole("student"), require("./controllers/get-a-courseStudentEnrollment"));

// delete a courseStudentEnrollment
router.delete("/:id", require("./controllers/delete-courseStudentEnrollment"));

// delete a courseStudentEnrollment
router.delete("/:id", require("./controllers/delete-courseStudentEnrollment"));

module.exports = router;