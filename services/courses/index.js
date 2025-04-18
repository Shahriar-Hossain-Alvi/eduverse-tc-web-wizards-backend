const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware");


// Apply middleware globally for all remaining routes
router.use(verifyToken)

// create a course => used by admin and faculty to add new course
router.post("/", verifyRole("admin", "faculty"), require("./controllers/create-course"));


// get all course => show all courses to all users
router.get("/", require("./controllers/get-all-course"));


// get all course list => show all courses title to add in the prerequisite courses
router.get("/allCourseTitle", verifyRole("admin", "faculty"), require("./controllers/get-allCourseTitle"));


// Get a course by id => show course details to all users
router.get("/:id", require("./controllers/get-a-course"));


// delete a course by id => admin and faculty can delete  course 
router.delete("/:id", verifyRole("admin", "faculty"), require("./controllers/delete-course"));


// update a course by id => admin and faculty can update course details
router.patch("/:id", verifyRole("admin", "faculty"), require("./controllers/update-course"));

module.exports = router;
