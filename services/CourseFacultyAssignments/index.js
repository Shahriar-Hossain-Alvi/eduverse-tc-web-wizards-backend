const express = require("express");
const router = express.Router();

// create all courseFacultyAssignment
router.post("/", require("./Views/create-courseFacultyAssignment"));

// get all courseFacultyAssignment
router.get("/", require("./Views/get-courseFacultyAssignment"));

// get a courseFacultyAssignment
router.get("/:id", require("./Views/get-a-courseFacultyAssignment"));

// delete all courseFacultyAssignment
router.delete("/:id", require("./Views/delete-courseFacultyAssignment"));

// update all courseFacultyAssignment
router.patch("/:id", require("./Views/update-courseFacultyAssignment"));

module.exports = router;
