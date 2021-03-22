import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// Gets all posts
router.get("/", async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (err) {
		res.json({ message: err });
	}
});

// Get specific post
router.get("/:postId", async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		res.json(post);
	} catch (err) {
		res.json({ message: err });
	}
});

// Submits a post
router.post("/", async (req, res) => {
	try {
		const { title, description } = req.body;
		const post = new Post({
			title,
			description,
		});
		const data = await post.save();
		res.json(data);
	} catch (err) {
		res.json({ message: err });
	}
});

// Update a post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = Post.updateOne({
      _id: req.params.postId
    }, {
      $set: {
        title: req.body.title
      },
    })
    res.json(updatedPost)
  } catch (err) {
    res.json({ message: err })
  }
})

// Delete a specific post
router.delete("/:postId", async (req, res) => {
	try {
		const removedPost = await Post.remove({
			_id: req.params.postId,
		});
		res.json(removedPost);
	} catch (err) {
		res.json({ message: err });
	}
});

export default router;
