const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware");
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware");


// Apply middleware globally for all remaining routes
router.use(verifyToken)

// create a courseStudentEnrollment
router.post("/", verifyRole("student"), require("./controllers/create-courseStudentEnrollment"));

// get all courseStudentEnrollment
router.get("/", require("./controllers/get-courseStudentEnrollment"));

// get a courseStudentEnrollment
router.get("/:id", require("./controllers/get-a-courseStudentEnrollment"));

// delete a courseStudentEnrollment
router.delete("/:id", require("./controllers/delete-courseStudentEnrollment"));

// delete a courseStudentEnrollment
router.delete("/:id", require("./controllers/delete-courseStudentEnrollment"));

module.exports = router;