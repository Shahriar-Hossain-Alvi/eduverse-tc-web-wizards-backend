const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware");
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware");

// Apply middleware globally for all remaining routes
router.use(verifyToken)

// get all deleted materials list
router.get("/", verifyRole("admin"), require("./controllers/get-all-deletedMaterialsList"));

module.exports = router;