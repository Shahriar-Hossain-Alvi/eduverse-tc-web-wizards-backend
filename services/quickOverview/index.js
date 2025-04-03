const express = require('express');
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware");
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware");


router.use(verifyToken);

// admin dashboard overview
router.get("/admin", verifyRole("admin"), require("./controllers/adminQuickOverview"));

// faculty quick overview
router.get("/faculty/:id", verifyRole("faculty"), require("./controllers/facultyQuickOverview"));

// student overview
router.get("/student/:id", verifyRole("student"), require("./controllers/studentQuickOverview"));



module.exports = router;