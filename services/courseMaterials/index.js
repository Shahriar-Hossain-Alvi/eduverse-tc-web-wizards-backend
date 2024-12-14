const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// crate new course material
router.post("/", verifyToken, require("./controllers/create-courseMaterial"));


// get all course material
router.get("/", verifyToken, require("./controllers/get-courseMaterial"));


// get single course material
router.get("/:id",verifyToken,  require("./controllers/get-a-courseMaterial"));


// delete a course material
router.delete("/:id",verifyToken, require("./controllers/delete-courseMaterial.js"))


// update a course material
router.patch("/:id",verifyToken, require("./controllers/update-courseMaterial.js"))





module.exports = router;