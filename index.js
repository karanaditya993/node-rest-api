const express = require("express");
const bodyParser = require("body-parser");
const postsRoutes = require("./routes/posts.js");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config.js");

const path = __dirname + "/views";
const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.axprl.mongodb.net/Cluster0?retryWrites=true&w=majority`;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/posts", postsRoutes);

app.get("/", (req, res) => {
	res.sendFile(`${path}/index.html`);
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
