const express = require("express");
const app = express();
const cors = require("cors");

require("./database"); // Connect to the database

// REST API
app.use(express.json());

// CORS Permission
app.use(
	cors({
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 204,
	})
);

module.exports = app;