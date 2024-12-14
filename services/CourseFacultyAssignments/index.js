const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// create all courseFacultyAssignment
router.post("/", verifyToken, require("./controllers/create-courseFacultyAssignment"));

// get all courseFacultyAssignment
router.get("/", verifyToken, require("./controllers/get-courseFacultyAssignment"));

// get a courseFacultyAssignment
router.get("/:id", verifyToken, require("./controllers/get-a-courseFacultyAssignment"));

// delete all courseFacultyAssignment
router.delete("/:id", verifyToken, require("./controllers/delete-courseFacultyAssignment"));

// update all courseFacultyAssignment
router.patch("/:id", verifyToken, require("./controllers/update-courseFacultyAssignment"));

module.exports = router;
