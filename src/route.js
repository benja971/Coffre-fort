const express = require("express");
const path = require("path");
require("dotenv").config();

const register = require("./controllers/register.controller");
const login = require("./controllers/login.controller");
const submitDocument = require("./controllers/submitDocument.controller");

// Route function called by both http and https servers
module.exports = function route(app) {
	// Global
	app.post("/register", register);

	app.post("/login", login);

	app.post("/submit-doc", submitDocument);

	app.use("/", express.static("public"));

	// App Pages
	app.get("/:page", (req, res) => {
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});

	// 404
	app.get("*", (req, res) => {
		res.status(404).sendFile("404.html", { root: __dirname });
	});
};
