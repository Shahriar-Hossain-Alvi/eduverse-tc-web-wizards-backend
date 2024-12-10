const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/courses", require("./courses"));
router.use("/courseMaterials", require("./courseMaterials"));

module.exports = router;
