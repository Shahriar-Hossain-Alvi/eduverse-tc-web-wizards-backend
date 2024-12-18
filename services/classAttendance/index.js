const express = require('express');
const router = express.Router();



// create a class attendance
router.post("/", require("./controllers/create-classAttendance"))


module.exports = router;