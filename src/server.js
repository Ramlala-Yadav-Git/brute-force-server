const express = require("express");
const cors = require("cors");
const connect = require("./configs/db");

const studentController = require("./controllers/student.controller");
const mentorController = require("./controllers/mentor.controller");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/students", studentController);
app.use("/mentors", mentorController);

const port = process.env.SERVER_PORT || "2345";

const start = async () => {
	await connect();
	app.listen(port, () => {
		console.log("Hurray! listening to port no", port);
	});
};

module.exports = start;
