const express = require("express");
const Student = require("../models/student.model");

const router = express.Router();

router.post("/", async (req, res) => {
	let student;
	try {
		student = await Student.find({ email: req.body.email }).lean().exec();
		if (student) {
			return res.status(201).json({ student });
		}
		student = await Student.create({
			name: req.body.name,
			age: Number(req.body.age),
			gender: req.body.gender,
			city: req.body.city,
			email: req.body.email,
			latitude: Number(req.body.latitude),
			longtitude: Number(req.body.longtitude),
			interest: req.body.interest,
			education: req.body.education,
			imageUrl: req.body.imageUrl,
		});
		return res.status(201).json({ student });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.get("/", async (req, res) => {
	try {
		let students = await Student.find().lean().exec();
		return res.status(200).json({ students });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.get("/:id", async (req, res) => {
	try {
		const student = await Student.findById(req.params.id).lean().exec();
		return res.status(200).json({ student });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.patch("/:id", async (req, res) => {
	try {
		const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
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
		const student = await Student.findByIdAndDelete(req.params.id);
		return res.status(200).json({ student });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
module.exports = router;
