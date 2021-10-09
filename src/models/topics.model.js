const mongoose = require("mongoose");

let TopicSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		comments: [
			{
				author: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				text: String,
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Topic", TopicSchema);
