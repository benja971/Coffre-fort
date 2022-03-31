module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		id_user: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		login: {
			type: Sequelize.STRING(50),
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		file_path: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	});

	return User;
};
