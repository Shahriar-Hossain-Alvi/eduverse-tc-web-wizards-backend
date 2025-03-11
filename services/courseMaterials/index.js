const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware");
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware")

// Apply middleware globally for all remaining routes
router.use(verifyToken)

// crate new course material
router.post("/", verifyRole("admin", "faculty"), require("./controllers/create-courseMaterial"));


// get all course material
router.get("/", require("./controllers/get-courseMaterial"));



// get single course material by course id => every user can access this route
router.get("/getMaterialByCourseId/:course_id", require("./controllers/get-a-courseMaterialByCourseId"));


// get single course material
router.get("/:id", require("./controllers/get-a-courseMaterial"));


// delete a course material => admin and faculty can delete course material
router.delete("/:id", verifyRole("admin", "faculty"), require("./controllers/delete-courseMaterial.js"))


// update a course material => update course material from assigned course page(faculty)
router.patch("/:id", verifyRole("admin", "faculty"), require("./controllers/update-courseMaterial.js"))





module.exports = router;