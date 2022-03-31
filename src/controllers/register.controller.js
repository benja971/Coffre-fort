const db = require("../models");
const users = db.user;

const register = async (req, res) => {
	const { login, password } = req.body;

	if (!login || !password)
		return res.status(404).json({
			error: "Login and password are required",
		});

	const user = await users.create({
		login,
		password,
	});

	if (!user)
		return res.status(400).json({
			success: false,
			message: "Login already exists",
		});

	res.status(200).json({
		success: true,
		message: "User created successfully",
		user,
	});
};

module.exports = register;
