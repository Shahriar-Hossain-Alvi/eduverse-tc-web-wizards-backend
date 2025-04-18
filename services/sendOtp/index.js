const express = require("express");
const router = express.Router();



router.post("/", require("./controllers/send-otp"));

module.exports = router;