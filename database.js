const mongoose = require("mongoose");
const { DB } = require("./configuration");

const clientOptions = {
	serverApi: { version: "1", strict: true, deprecationErrors: true },
};

// Connect to the database
mongoose
	.connect(DB.uri, clientOptions)
	.then(() => {
		console.log("DB Connected Successfully");
	})
	.catch((err) => {
		console.log("An error occurred while connecting to the database", err);
	});

module.exports = mongoose;