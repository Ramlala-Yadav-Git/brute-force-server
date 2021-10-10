const express = require("express");

const router = express.Router();

const LocalData = require("../models/local.model");
const User = require("../models/user.model");

router.get("/comments/:id", async function (req, res) {
	try {
		const user = await User.findById(req.params.id).lean().exec();
		const d = await LocalData.find().populate("author").lean().exec();
		const data = d.filter((item) => {
			return item.location === user.location;
		});
		res.status(200).json({ data, location: user.location });
	} catch (e) {
		return res.status(400).json({
			error: "Something went wrong",
		});
	}
});

router.post("/", async function (req, res) {
	try {
		const comment = await LocalData.create(req.body);
		res.status(201).send({ data: comment });
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			error: "Something went wrong",
		});
	}
});

module.exports = router;
