import express from "express";
import bodyParser from "body-parser";
import postsRoutes from "./routes/posts.js";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.axprl.mongodb.net/Cluster0?retryWrites=true&w=majority`;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/posts", postsRoutes);

app.get("/", (req, res) => {
	res.send("Hello from the homepage");
});

async function connectToDB() {
	try {
		await mongoose.connect(DB_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log("Connected to MongoDB 🍃");
	} catch (err) {
		console.log(`Error connecting to MongoDB: ${err}`);
		process.exit(1);
	}
}

connectToDB();

app.listen(PORT, () => {
	console.log(`Server running on port: http://localhost:${PORT}`);
});
