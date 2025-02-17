const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// Apply middleware globally for all remaining routes
router.use(verifyToken)

// crate new course material
router.post("/", require("./controllers/create-courseMaterial"));


// get all course material
router.get("/", require("./controllers/get-courseMaterial"));


// get single course material
router.get("/:id",  require("./controllers/get-a-courseMaterial"));


// delete a course material
router.delete("/:id", require("./controllers/delete-courseMaterial.js"))


// update a course material
router.patch("/:id", require("./controllers/update-courseMaterial.js"))





module.exports = router;