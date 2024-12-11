const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// create all courseFacultyAssignment
router.post("/", verifyToken, require("./view/create-courseFacultyAssignment"));

// get all courseFacultyAssignment
router.get("/", verifyToken, require("./view/get-courseFacultyAssignment"));

// get a courseFacultyAssignment
router.get("/:id", verifyToken, require("./view/get-a-courseFacultyAssignment"));

// delete all courseFacultyAssignment
router.delete("/:id", verifyToken, require("./view/delete-courseFacultyAssignment"));

// update all courseFacultyAssignment
router.patch("/:id", verifyToken, require("./view/update-courseFacultyAssignment"));

module.exports = router;
