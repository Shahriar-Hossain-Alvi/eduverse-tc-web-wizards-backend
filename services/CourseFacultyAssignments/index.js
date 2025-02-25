const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware");
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware");

// Apply middleware globally for all remaining routes
router.use(verifyToken)

// create courseFacultyAssignment => used in course details to create courseFacultyAssignment data by admin while adding/updating faculty so using PUT method
router.post("/", verifyRole("admin"), require("./controllers/create-courseFacultyAssignment"));

// get all courseFacultyAssignment
router.get("/", require("./controllers/get-courseFacultyAssignment"));

// get a courseFacultyAssignment by faculty id => used in faculty dashboard to get all assigned courses
router.get("/myAssignedCourses/:facultyId", verifyRole("faculty"), require("./controllers/get-courseFacultyAssignmentByFaculty"));

// get a courseFacultyAssignment => used in singleAssignedCoursesDetails page to get course details
router.get("/:id", verifyRole("admin", "faculty"), require("./controllers/get-a-courseFacultyAssignment"));

// delete all courseFacultyAssignment
router.delete("/:id", require("./controllers/delete-courseFacultyAssignment"));

// update a courseFacultyAssignment
router.patch("/:id", require("./controllers/update-courseFacultyAssignment"));

module.exports = router;
