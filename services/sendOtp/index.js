const express = require("express");
const router = express.Router();


// generate and send opt to user by email
router.post("/send", require("./controllers/send-otp"));


// verify otp
router.post("/verify", require("./controllers/verify-otp"));

module.exports = router;