import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		default: Date.now,
	},
});

const PostModel = mongoose.model("Posts", PostSchema);

export default PostModel;
