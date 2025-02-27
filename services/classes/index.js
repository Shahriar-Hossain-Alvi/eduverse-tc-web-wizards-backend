const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware");
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware")

// Apply middleware globally for all remaining routes
router.use(verifyToken)



// create a class schedule by faculty (admin functionality will be added)
router.post("/", verifyRole("admin", "faculty"), require("./controllers/create-classes"));

// get all classes
router.get("/", require("./controllers/get-classes"));


// get all classes of a course by course id
router.get("/:course_id", verifyRole("admin", "faculty"), require("./controllers/get-classes-of-a-course"));


// get a class by class id
router.get("/:id", require("./controllers/get-a-classes"));


// delete a class
router.delete("/:id", require("./controllers/delete-classes"));

// update a class
router.patch("/:id", require("./controllers/update-classes"));

module.exports = router;