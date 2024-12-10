const express = require("express");
const router = express.Router();

// create all courseStudentEnrollment
router.post("/", require("./Views/create-courseStudentEnrollment"));

// get all courseStudentEnrollment
 router.get("/", require("./Views/get-courseStudentEnrollment"));

// get a courseStudentEnrollment
 router.get("/:id", require("./Views/get-a-courseStudentEnrollment"));

// delete a courseStudentEnrollment
 router.delete("/:id", require("./Views/delete-courseStudentEnrollment"));
 
// delete a courseStudentEnrollment
 router.delete("/:id", require("./Views/delete-courseStudentEnrollment"));

module.exports = router;