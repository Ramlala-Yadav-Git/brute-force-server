const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		familyName: { type: String, required: true },
		givenName: { type: String, required: true },
		imageUrl: { type: String, required: true },

	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("User", UserSchema);
