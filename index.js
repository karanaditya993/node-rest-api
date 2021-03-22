import express from "express";
import bodyParser from "body-parser";
import postsRoutes from "./routes/posts.js";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/posts", postsRoutes);

app.get("/", (req, res) => {
	res.send("Hello from the homepage");
});

mongoose.connect(
	`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.axprl.mongodb.net/Cluster0?retryWrites=true&w=majority`,
	{ useUnifiedTopology: true, useNewUrlParser: true },
	() => {
		console.log("Connected to MongoDB 🍃");
	}
);

app.listen(PORT, () => {
	console.log(`Server running on port: http://localhost:${PORT}`);
});
