const express = require('express');
const router = express.Router();



// create a class attendance
router.post("/", require("./controllers/create-classAttendance"))


// get class attendance for a specific class
router.get("/:class_id", require("./controllers/get-a-classAttendance"));


module.exports = router;