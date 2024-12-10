const express = require("express");
const router = express.Router();

// create all courseFacultyAssignment
router.post("/", require("./Views/create-courseFacultyAssignment"));


module.exports = router;
