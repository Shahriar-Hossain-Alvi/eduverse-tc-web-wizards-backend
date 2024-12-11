const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// create all courseStudentEnrollment
router.post("/", verifyToken, require("./view/create-courseStudentEnrollment"));

// get all courseStudentEnrollment
router.get("/", verifyToken, require("./view/get-courseStudentEnrollment"));

// get a courseStudentEnrollment
router.get("/:id", verifyToken, require("./view/get-a-courseStudentEnrollment"));

// delete a courseStudentEnrollment
router.delete("/:id", verifyToken, require("./view/delete-courseStudentEnrollment"));

// delete a courseStudentEnrollment
router.delete("/:id", verifyToken, require("./view/delete-courseStudentEnrollment"));

module.exports = router;