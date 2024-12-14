const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// create all course
router.post("/", verifyToken, require("./controllers/create-course"));
// get all course
router.get("/", verifyToken, require("./controllers/get-course"));
// Get a course by id
router.get("/:id", verifyToken, require("./controllers/get-a-course"));
// delete a course by id
router.delete("/:id", verifyToken, require("./controllers/delete-course"));
// update a course by id
router.patch("/:id", verifyToken, require("./controllers/update-course"));

module.exports = router;
