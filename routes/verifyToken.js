const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.header("auth-token");
		if (!token) return res.status(401).send("Access Denied");

		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		console.log("Invalid Token", err);
		res.status(400).send("Invalid Token");
	}
};
