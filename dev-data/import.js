const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("../models/bookModel");
const fs = require("fs");

dotenv.config({ path: "../config.env" });

const DB = process.env.DATABASE.replace("<password>", "vijay");

mongoose
	.connect(DB, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("DB connected!!");
	});

const book = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "utf-8"));
let data = [];
book.forEach((books) => {
	let bookdata = [];
	bookdata.name = books.volumeInfo.title;
	(bookdata.author = books.volumeInfo.authors[0]),
		(bookdata.image = books.volumeInfo.imageLinks.thumbnail),
		(bookdata.description = books.volumeInfo.description),
		(bookdata.pageCount = books.volumeInfo.pageCount);
	if (books.saleInfo.saleability === "FOR_SALE") {
		bookdata.price = Math.floor(books.saleInfo.retailPrice.amount);
	} else {
		bookdata.price = 350;
	}
	data.push(bookdata);
});
const importData = async () => {
	try {
		await Book.create(data);

		console.log("data inserted");
		process.exit();
	} catch (err) {
		console.log(err);
	}
};

const deleteData = async () => {
	try {
		await Book.deleteMany();
		console.log("data deleted");
		process.exit();
	} catch (err) {
		console.log(err);
	}
};

//deleteData();
importData();
