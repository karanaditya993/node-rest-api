const express = require("express");
const Post = require("../models/Post.js");
const verify = require("./verifyToken");

const router = express.Router();

// Gets all posts
router.get("/", verify, async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (err) {
		console.log(`Error retrieving posts: ${err}`);
		res.json({ message: err });
	}
});

// Get specific post
router.get("/:postId", verify, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		res.json(post);
	} catch (err) {
		console.log(`Error retrieving specific post ${req.params.postId}: ${err}`);
		res.json({ message: err });
	}
});

// Submits a post
router.post("/", verify, async (req, res) => {
	try {
		const { title, description, author } = req.body;
		const post = new Post({
			title,
			description,
			author,
		});
		const data = await post.save();
		res.json(data);
	} catch (err) {
		console.log(`Error submitting posts: ${err}`);
		res.json({ message: err });
	}
});

// Update a post
router.patch("/:postId", verify, async (req, res) => {
	try {
		const updatedPost = Post.updateOne(
			{
				_id: req.params.postId,
			},
			{
				$set: {
					title: req.body.title,
				},
			}
		);
		res.json(updatedPost);
	} catch (err) {
		console.log(`Error updating specific post ${req.params.postId}: ${err}`);
		res.json({ message: err });
	}
});

// Delete a specific post
router.delete("/:postId", verify, async (req, res) => {
	try {
		const removedPost = await Post.remove({
			_id: req.params.postId,
		});
		res.json(removedPost);
	} catch (err) {
		console.log(`Error deleting specific post ${req.params.postId}: ${err}`);
		res.json({ message: err });
	}
});

module.exports = router;
