const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// create all courseStudentEnrollment
router.post("/", verifyToken, require("./controllers/create-courseStudentEnrollment"));

// get all courseStudentEnrollment
router.get("/", verifyToken, require("./controllers/get-courseStudentEnrollment"));

// get a courseStudentEnrollment
router.get("/:id", verifyToken, require("./controllers/get-a-courseStudentEnrollment"));

// delete a courseStudentEnrollment
router.delete("/:id", verifyToken, require("./controllers/delete-courseStudentEnrollment"));

// delete a courseStudentEnrollment
router.delete("/:id", verifyToken, require("./controllers/delete-courseStudentEnrollment"));

module.exports = router;