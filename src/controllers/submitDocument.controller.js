const fs = require("fs");
const path = require("path");

const db = require("../models");
const users = db.user;

const submitDocument = async (req, res) => {
	const { id_user } = req.body;
	const file = req.files?.document;

	if (!id_user || !file)
		return res.status(404).json({
			success: false,
			message: "Missing parameters",
		});

	// get extension of file
	const ext = path.extname(file.name);
	const fileName = `${id_user}-secured${ext}`;
	const filePath = `userfiles/${fileName}`;

	const ok = await users.update(
		{
			file_path: filePath,
		},
		{
			where: {
				id_user,
			},
		},
	);

	if (ok[0] === 0)
		return res.status(404).json({
			success: false,
			message: "User not found",
		});

	fs.writeFileSync(`./public/${filePath}`, file.data);

	res.status(200).json({
		success: true,
		message: "Document submitted successfully",
		filePath,
	});
};

module.exports = submitDocument;
