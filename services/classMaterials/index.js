const express = require('express');
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// Apply middleware globally for all remaining routes
router.use(verifyToken)

// create class materials
router.post("/", require("./controllers/create-classMaterial"));

// get all class materials
router.get("/", require("./controllers/get-all-classMaterials"));

// get a class material
router.get("/:id", require("./controllers/get-a-classMaterials"));


// delete class material
router.delete("/:id", require("./controllers/delete-classMaterial"))


// update class materials
router.patch("/:id", require("./controllers/update-classMaterial"));

module.exports = router;


