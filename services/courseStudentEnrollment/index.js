const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// create all courseStudentEnrollment
router.post("/", verifyToken, require("./Views/create-courseStudentEnrollment"));

// get all courseStudentEnrollment
router.get("/", verifyToken, require("./Views/get-courseStudentEnrollment"));

// get a courseStudentEnrollment
router.get("/:id", verifyToken, require("./Views/get-a-courseStudentEnrollment"));

// delete a courseStudentEnrollment
router.delete("/:id", verifyToken, require("./Views/delete-courseStudentEnrollment"));

// delete a courseStudentEnrollment
router.delete("/:id", verifyToken, require("./Views/delete-courseStudentEnrollment"));

module.exports = router;