const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
dotenv.config();

const port = process.env.PORT || 8080;
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
	})
	.then(() => {
		app.listen(port, () => {
			console.log(`listening at ${port}`);
		});
	});
