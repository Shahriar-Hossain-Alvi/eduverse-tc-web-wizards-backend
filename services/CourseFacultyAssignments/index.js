const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// create all courseFacultyAssignment
router.post("/", verifyToken, require("./Views/create-courseFacultyAssignment"));

// get all courseFacultyAssignment
router.get("/", verifyToken, require("./Views/get-courseFacultyAssignment"));

// get a courseFacultyAssignment
router.get("/:id", verifyToken, require("./Views/get-a-courseFacultyAssignment"));

// delete all courseFacultyAssignment
router.delete("/:id", verifyToken, require("./Views/delete-courseFacultyAssignment"));

// update all courseFacultyAssignment
router.patch("/:id", verifyToken, require("./Views/update-courseFacultyAssignment"));

module.exports = router;
