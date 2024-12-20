const express = require('express');
const router = express.Router();



// create a class attendance
router.post("/", require("./controllers/create-classAttendance"));


// get all class attendance
router.get("/", require("./controllers/get-all-classAttendance"));


// delete class attendance
router.delete("/:id", require("./controllers/delete-classAttendance"));


// update a class Attendance
router.patch("/:id", require("./controllers/update-classAttendance"));


// get class attendance for a specific class
router.get("/:class_id", require("./controllers/get-a-classAttendance"));



module.exports = router;