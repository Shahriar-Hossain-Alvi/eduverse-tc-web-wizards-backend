const express = require('express');
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware");
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware")


// Apply middleware globally for all remaining routes
router.use(verifyToken)


// create a class attendance
router.post("/", verifyRole("admin", "faculty"), require("./controllers/create-classAttendance"));


// get all class attendance
router.get("/", verifyRole("admin"),require("./controllers/get-all-classAttendance"));


// delete class attendance
router.delete("/:id",verifyRole("admin", "faculty"), require("./controllers/delete-classAttendance"));


// update a class Attendance
router.patch("/:id", verifyRole("admin", "faculty"), require("./controllers/update-classAttendance"));

// get all attendance of a student
router.get("/studentAttendance/:id", verifyRole("admin", "faculty", "student"), require("./controllers/get-a-students-attendances"));

// get class attendance for a specific class
router.get("/:class_id", verifyRole("admin", "faculty", "student"), require("./controllers/get-a-classAttendance"));



module.exports = router;