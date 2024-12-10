const app = require("./app");
const { PORT } = require("./configuration");

app.use("/api", require("./services"));

// Middleware Error Handler
app.use(require("./utils/middleware/error/error.middleware"));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});