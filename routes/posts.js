const express = require("express");
const Posts = require("../models/posts");

const router = express.Router();

//save posts
router.post("/post/save", (req, res) => {
  let newPost = new Posts(req.body);
  newPost
    .save()
    .then(() => {
      return res.status(200).json({
        success: "Post Saved Successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});

//get posts
router.get("/posts", (req, res) => {
  Posts.find()
    .then((posts) => {
      return res.status(200).json({
        success: true,
        existingPosts: posts,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});

//update posts
router.put("/post/update/:id", (req, res) => {
  Posts.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((post) => {
      return res.status(200).json({
        success: "Updated Successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
});

//delete post
router.delete("/post/delete/:id", (req, res) => {
  Posts.findByIdAndRemove(req.params.id)
    .then((deletedPost) => {
      return res.json({
        message: "Delete Successfull",
        deletedPost,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    });
});

module.exports = router;
