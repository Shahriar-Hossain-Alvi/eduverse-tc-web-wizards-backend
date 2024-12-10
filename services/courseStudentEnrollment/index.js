const express = require("express");
const router = express.Router();

router.post("/", require("./Views/create-courseStudentEnrollment"))

module.exports = router;