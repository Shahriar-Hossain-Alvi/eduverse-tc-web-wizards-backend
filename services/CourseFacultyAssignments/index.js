const express = require("express");
const router = express.Router();

// create all courseFacultyAssignment
router.post("/", require("./Views/create-courseFacultyAssignment"));

// get all courseFacultyAssignment
router.get("/", require("./Views/get-courseFacultyAssignment"));

// get all courseFacultyAssignment
router.get("/:id", require("./Views/get-a-courseFacultyAssignment"));

module.exports = router;
