const express = require("express");
const User = require("../models/user.model");
const Blog = require("../models/book.model");
const Topic = require("../models/topics.model");
const router = express.Router();

router.post("/mybook/:id", async (req, res) => {
	let user;
	let book;
	// console.log(req.params.id);
	try {
		user = await User.findById(req.params.id).lean().exec();
		book = await Blog.find().populate("seller").lean().exec();
		const data = book.filter((item) => {
			return user.email === item.seller.email;
		});
		res.status(201).send({ data });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.post("/localbook/:id", async (req, res) => {
	let user;
	let book;
	try {
		user = await User.findById(req.params.id).lean().exec();
		book = await Blog.find().populate("seller").lean().exec();
		data = book.filter(
			(item) =>
				user.email !== item.seller.email && user.location === item.location
		);
		res.status(201).send({ data });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.post("/globalbook/:id", async (req, res) => {
	let user;
	let book;
	try {
		user = await User.findById(req.params.id).lean().exec();
		book = await Blog.find().populate("seller").lean().exec();
		const data = book.filter((item) => user.email !== item.seller.email);
		res.status(201).send({ data });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});

router.post("/:id/book/:bookid", async (req, res) => {
	let user;
	let book;
	try {
		user = await User.findById(req.params.id).lean().exec();
		book = await Blog.findById(req.params.bookid)
			.populate("comments.author")
			.populate("seller")
			.lean()
			.exec();
		let data;
		if (book.seller.email === user.email) {
			data = [...book.comments];
		} else {
			data = book.comments.filter((item) => {
				console.log(item.author.email, user.email, book.seller.email);
				return (
					item.author.email === user.email ||
					item.author.email === book.seller.email
				);
			});
		}
		res.status(201).send({ data });
	} catch (e) {
		console.log(e);
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.patch("/:id/book/:bookid", async (req, res) => {
	let user;
	let book;
	try {
		book = await Blog.findById(req.params.bookid).lean().exec();
		console.log(book.comments);
		const payload = { text: req.body.text, author: req.params.id };
		let data = [...book.comments, payload];
		book = await Blog.findByIdAndUpdate(
			req.params.bookid,
			{ comments: data },
			{
				new: true,
			}
		);
		res.status(200).send({ data: book });
	} catch (e) {
		console.log(e);
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.get("/trending", async (req, res) => {
	let trending;
	try {
		trending = await Blog.find()
			.sort({ claps: -1 })
			.populate("author")
			.populate("topic")
			.populate("comments.author")
			.limit(6)
			.lean()
			.exec();
		res.status(200).send({ trending });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.get("/:id/topics", async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
			.populate("followers")
			.populate("followingTopics")
			.populate("following")
			.lean()
			.exec();
		const topics = user.followingTopics;
		res.status(200).send({ topics });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.get("/:id/nottopics", async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
			.populate("followers")
			.populate("followingTopics")
			.populate("following")
			.lean()
			.exec();
		const allTopics = await Topic.find().lean().exec();
		const topics = user.followingTopics.map((item) => item.title);
		const topic = allTopics.filter((item) => {
			return !topics.includes(item.title);
		});
		const data = topic.slice(0, 9);
		res.status(200).send({ data });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.get("/:id/notfollow", async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
			.populate("followers")
			.populate("followingTopics")
			.populate("following")
			.lean()
			.exec();
		const allUser = await User.find()
			.populate("followers")
			.populate("followingTopics")
			.populate("following")
			.lean()
			.exec();
		const peoples = user.following;
		let ids = peoples.map((item) => {
			return item.name;
		});
		ids = [...ids, user.name];
		const people = allUser.filter((item) => {
			return !ids.includes(item.name);
		});
		const data = people.slice(0, 3);
		res.status(200).send({ data });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});

router.get("/:id/followingblogs", async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
			.populate("followers")
			.populate("followingTopics")
			.populate("following")
			.lean()
			.exec();
		const allBlogs = await Blog.find()
			.populate("author")
			.populate("topic")
			.populate("comments.author")
			.lean()
			.exec();
		const following = user.following.map((item) => {
			return item.name;
		});
		const data = allBlogs.filter((item) => {
			return following.includes(item.author.name);
		});
		res.status(200).send({ data });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
router.post("/topicsblog", async (req, res) => {
	try {
		const topic = req.body.topic;
		const allBlogs = await Blog.find()
			.populate("author")
			.populate("topic")
			.populate("comments.author")
			.lean()
			.exec();
		const data = allBlogs.filter((item) => {
			return item.topic.title === topic;
		});
		res.status(201).send({ data });
	} catch (e) {
		return res
			.status(400)
			.send({ status: "failed", message: "Something went wrong" });
	}
});
module.exports = router;
