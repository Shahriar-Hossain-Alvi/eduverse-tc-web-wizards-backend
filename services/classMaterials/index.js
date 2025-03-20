const express = require('express');
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware");
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware");

// Apply middleware globally for all remaining routes
router.use(verifyToken)

// create class materials
router.post("/", verifyRole("admin", "faculty"), require("./controllers/create-classMaterial"));

// get all class materials
router.get("/", require("./controllers/get-all-classMaterials"));


// get a class material by class_id
router.get("/getMaterialsByClassId/:class_id", verifyRole("admin", "student", "faculty"), require("./controllers/get-a-classMaterialByClassId"));


// get a class material by  id
router.get("/:id", verifyRole("admin", "student", "faculty"), require("./controllers/get-a-classMaterials"));


// delete class material
router.delete("/:id", verifyRole("admin", "faculty"), require("./controllers/delete-classMaterial"))


// update class materials
router.patch("/:id", require("./controllers/update-classMaterial"));

module.exports = router;


