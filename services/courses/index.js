const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware");


// Apply middleware globally for all remaining routes
router.use(verifyToken)

// create a course
router.post("/", require("./controllers/create-course"));


// get all course => show all courses to all users
router.get("/", require("./controllers/get-course"));


// get all course list => show all courses title to add in the prerequisite courses
router.get("/allCourseTitle", verifyRole("admin"), require("./controllers/get-allCourseTitle"));


// Get a course by id => show course details to all users
router.get("/:id", require("./controllers/get-a-course"));


// delete a course by id
router.delete("/:id", require("./controllers/delete-course"));


// update a course by id
router.patch("/:id", require("./controllers/update-course"));

module.exports = router;
