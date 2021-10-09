const mongoose = require("mongoose");

const connect = () => {
	return mongoose.connect(
<<<<<<< HEAD
		"mongodb + srv://Ramlala:Ramlala@123@cluster0.n467z.mongodb.net/brute-force?retryWrites=true&w=majority",
=======
		"mongodb+srv://Ramlala:Ramlala@123@cluster0.n467z.mongodb.net/brute-force?retryWrites=true&w=majority",
>>>>>>> 866b7a03cedd66fabd4547824969a73130709d41
		{
			useCreateIndex: true,
			useFindAndModify: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);
};

module.exports = connect;
