const express = require("express");
const Mentor = require("../models/mentor.model");

const router = express.Router();

router.post("/", async (req, res) => {
	let mentor;
	try {
		// mentor = await Mentor.find({ email: req.body.email }).lean().exec();
		// if (mentor) {
		// 	return res.status(201).json({ mentor });
		// }
		console.log("k");
		mentor = await Mentor.create({
			name: req.body.name,
			age: Number(req.body.age),
			gender: req.body.gender,
			email: req.body.email,
			latitude: Number(req.body.latitude),
			longtitude: Number(req.body.longtitude),
			specialization: req.body.specialization,
			company: req.body.company,
		});
		return res.status(201).json({ mentor });
	} catch (e) {
		console.log(e);
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.get("/", async (req, res) => {
	try {
		let mentors = await Mentor.find().lean().exec();
		return res.status(200).json({ mentors });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.get("/:id", async (req, res) => {
	try {
		const mentor = await Mentor.findById(req.params.id).lean().exec();
		return res.status(200).json({ mentor });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.patch("/:id", async (req, res) => {
	try {
		const mentor = await Mentor.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		return res.status(200).json({ student });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.delete("/:id", async (req, res) => {
	try {
		const mentor = await Mentor.findByIdAndDelete(req.params.id);
		return res.status(200).json({ mentor });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
module.exports = router;
