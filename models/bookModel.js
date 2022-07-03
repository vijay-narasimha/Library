const mongoose = require("mongoose");
const slugify = require("slugify");

const BookSchema = new mongoose.Schema({
	name: String,
	price: {
		type: Number,
		default: 350,
	},
	author: String,
	description: String,
	image: {
		type: String,
		default: "default.jpg",
	},
	slug: String,
	pageCount: Number,
	NoofBooks: {
		type: String,
		default: 1,
	},
	takenUser: {
		type: Array,
	},
	takenBy: {
		type: Array,
	},
	endTime: {
		type: Date,
	},
	issued: {
		type: Number,
		default: 0,
	},
});

BookSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
