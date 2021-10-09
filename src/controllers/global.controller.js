const express = require("express");

const router = express.Router();

const GlobalData = require("../models/topics.model");

router.get("/", async function (req, res) {
	try {
		const data = await GlobalData.find().populate("author").lean().exec();
		res.status(200).json({ data });
	} catch (e) {
		return res.status(400).json({
			error: "Something went wrong",
		});
	}
});

router.post("/", async function (req, res) {
	try {
		const comment = await GlobalData.create(req.body);
		res.status(201).send({ data: comment });
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			error: "Something went wrong",
		});
	}
});

module.exports = router;
