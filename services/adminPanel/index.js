const express = require('express');
const router = express.Router();

const verifyToken = require("../../utils/middleware/token-verification/auth.middleware");


router.get("/", require("./controllers/quickOverview"));

module.exports = router;