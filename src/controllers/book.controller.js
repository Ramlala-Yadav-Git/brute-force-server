const express = require("express");
const { multerUploads } = require("../middlewares/multer");
const upload = require("../middlewares/upload");
const Blog = require("../models/book.model");
const User = require("../models/user.model");
const router = express.Router();

router.post("/", multerUploads, upload, async (req, res) => {
	let blog;
	let location;
	try {
		const user = await User.findById(req.body.seller).lean().exec();
		location = user.location;
		console.log(location);
		blog = await Blog.findOne({
			title: req.body.title,
			location: req.body.location,
			seller: req.body.seller,
		})
			.lean()
			.exec();
		console.log("blog", req.body.location);
		if (!blog) {
			blog = await Blog.create({
				title: req.body.title,
				type: req.body.type,
				description: req.body.description,
				featureImg: req.image,
				price: Number(req.body.price),
				author: req.body.author,
				seller: req.body.seller,
				condition: req.body.condition,
				location: req.body.location || location,
				comments: [],
			});
		}

		return res.status(201).json({ blog });
	} catch (e) {
		console.log(e);
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.get("/", async (req, res) => {
	let blogs;
	try {
		blogs = await Blog.find().lean().exec();

		return res.status(200).json({ blogs });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.get("/:id", async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id)
			.populate("seller")
			.populate("comments.author")
			.lean()
			.exec();
		return res.status(200).json({ blog });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.patch("/:id", async (req, res) => {
	console.log(req.body);
	try {
		const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		return res.status(200).json({ blog });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.delete("/:id", async (req, res) => {
	try {
		const blog = await Blog.findByIdAndDelete(req.params.id);
		return res.status(200).json({ blog });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
module.exports = router;
