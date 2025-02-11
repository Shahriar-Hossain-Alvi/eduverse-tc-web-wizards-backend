const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware");
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware");

// Apply middleware globally for all remaining routes
router.use(verifyToken)

// create courseFacultyAssignment
router.post("/", verifyRole("admin"), require("./controllers/create-courseFacultyAssignment"));

// get all courseFacultyAssignment
router.get("/", require("./controllers/get-courseFacultyAssignment"));

// get a courseFacultyAssignment
router.get("/:id", require("./controllers/get-a-courseFacultyAssignment"));

// delete all courseFacultyAssignment
router.delete("/:id", require("./controllers/delete-courseFacultyAssignment"));

// update all courseFacultyAssignment
router.patch("/:id", require("./controllers/update-courseFacultyAssignment"));

module.exports = router;
