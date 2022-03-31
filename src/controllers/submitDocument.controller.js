const fs = require("fs");
const path = require("path");

const db = require("../models");
const users = db.user;

const submitDocument = async (req, res) => {
	const { id_user } = req.body;
	const { document } = req?.files;

	if (!id_user || !document)
		return res.status(404).json({
			success: false,
			message: "Missing parameters",
		});

	// get extension of document
	const ext = path.extname(document.name);
	const documentName = `${id_user}-secured${ext}`;
	const documentPath = `userfiles/${documentName}`;

	const ok = await users.update(
		{
			file_path: documentPath,
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

	fs.writeFileSync(`./public/${documentPath}`, document.data);

	res.status(200).json({
		success: true,
		message: "Document submitted successfully",
		documentPath,
	});
};

module.exports = submitDocument;
