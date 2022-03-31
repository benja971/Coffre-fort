const db = require("../models");
const users = db.user;

const login = async (req, res) => {
	const { login, password } = req.body;

	if (!login || !password)
		return res.status(400).json({
			error: "Login and password are required",
		});

	const user = await users.findOne({
		where: {
			login,
			password,
		},
	});

	if (!user)
		return res.status(404).json({
			success: false,
			message: "Login or password is incorrect",
		});

	res.status(200).json({
		success: true,
		message: "User logged in successfully !",
		user,
	});
};

module.exports = login;
