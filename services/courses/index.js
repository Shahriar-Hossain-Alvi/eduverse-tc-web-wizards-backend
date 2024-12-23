const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// Apply middleware globally for all remaining routes
router.use(verifyToken)

// create all course
router.post("/", require("./controllers/create-course"));
// get all course
router.get("/", require("./controllers/get-course"));
// Get a course by id
router.get("/:id", require("./controllers/get-a-course"));
// delete a course by id
router.delete("/:id", require("./controllers/delete-course"));
// update a course by id
router.patch("/:id", require("./controllers/update-course"));

module.exports = router;
