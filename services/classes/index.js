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


// get a class by class id
router.get("/:id", verifyRole("admin", "faculty", "student"), require("./controllers/get-a-class"));


// get all classes of a course by course id => every one can access
router.get("/:course_id", verifyRole("admin", "faculty", "student"), require("./controllers/get-classes-of-a-course"));


// delete a class
router.delete("/:id", verifyRole("admin", "faculty"),require("./controllers/delete-a-class"));

// update a class => used by faculty to update class schedule data
router.patch("/:id",verifyRole("admin", "faculty"), require("./controllers/update-classes"));

module.exports = router;