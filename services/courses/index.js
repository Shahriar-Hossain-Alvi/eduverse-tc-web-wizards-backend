const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// create all course
router.post("/", verifyToken, require("./view/create-course"));
// get all course
router.get("/", verifyToken, require("./view/get-course"));
// Get a course by id
router.get("/:id", verifyToken, require("./view/get-a-course"));
// delete a course by id
router.delete("/:id", verifyToken, require("./view/delete-course"));
// update a course by id
router.patch("/:id", verifyToken, require("./view/update-course"))

module.exports = router;
