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
    data = data.reverse();
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
router.get("/:id/result/:query", async (req, res) => {
  let user;
  let book;
  try {
    user = await User.findById(req.params.id).lean().exec();
    book = await Blog.find()
      .populate("comments.author")
      .populate("seller")
      .lean()
      .exec();
    const data = book.filter((item) => {
      st = item.title.toLowerCase().split(" ").join("");
      return (
        st.includes(req.params.query.toLowerCase()) &&
        item.seller.email !== user.email
      );
    });
    res.status(200).send({ data });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .send({ status: "failed", message: "Something went wrong" });
  }
});

module.exports = router;
