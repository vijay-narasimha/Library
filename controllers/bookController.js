const Book = require("./../models/bookModel");

const User = require("../models/userModel");
const date = require("date-and-time");

exports.getAllBooks = async (req, res) => {
	try {
		const data = await Book.find();
		res.status(200).json({
			status: "success",
			total: data.length,
			data,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: err,
		});
	}
};

exports.getBook = async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: book,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: err,
		});
	}
};

exports.createBook = async (req, res) => {
	try {
		const book = await Book.create(req.body);
		res.status(201).json({
			status: "success",
			data: book,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: err.message,
		});
	}
};
exports.deleteBook = async (req, res) => {
	try {
		await Book.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: "success",
			data:{
				message:"Book Deleted!"
			}
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: "deleting the book failed",
		});
	}
};

exports.payment = async (req, res) => {
	try {
		let array = res.locals.user.cart;
		let mode = req.params.mode;
		array.forEach(async (book) => {
			let db = await Book.findById(book);

			db.NoofBooks = db.NoofBooks - 1;
			db.takenUser.push(res.locals.user._id);
			db.takenBy.push(mode);
			const newdate = new Date(Date.now() + 5 * 60 * 1000);
			let now = date.format(newdate, "YYYY/MM/DD HH:mm:ss");
			db.endTime = now;
			db.issued = db.issued + 1;
			await Book.findByIdAndUpdate(book, db);
		});

		let user = await User.findOne({ email: res.locals.user.email });

		user.cart = [];

		user.issuedBooks.push(...array);
		await User.findByIdAndUpdate(user._id, user);

		res.status(200).json({
			status: "success",
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: err,
		});
	}
};

exports.saveBooks = async (req, res, next) => {
	try {
		if (res.locals.user) {
			const array = res.locals.user.issuedBooks || [];

			const books = await Book.find();
			let issued = [];
			let saved = [];

			if (array.length > 0) {
				books.forEach((book) => {
					if (array.includes(book._id)) {
						let bid;
						array.forEach((id) => {
							if (id == book._id) {
								bid = id;
							}
						});
						let start = date.format(new Date(), "YYYY/MM/DD HH:mm:ss");
						let end = date.format(book.endTime, "YYYY/MM/DD HH:mm:ss");
						if (end > start) {
							issued.push(bid);
						} else {
							saved.push(bid);
						}
					}
				});
			}
			if (saved.length != 0) {
				res.locals.user.issuedBooks = issued;

				res.locals.user.returnedBooks.push(...saved);

				saved.forEach(async (id) => {
					let dbbook = await Book.findById(id);
					dbbook.NoofBooks = 1;
					dbbook.takenBy = [];
					dbbook.takenUser = [];
					await Book.findByIdAndUpdate(dbbook._id, dbbook);
				});

				saved.forEach(async (id) => {
					let dbbook = await Book.findById(id);

					res.locals.user.endTime.push(dbbook.endTime);
					await User.findByIdAndUpdate(res.locals.user._id, res.locals.user);
				});
			}
		}

		return next();
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: err.message,
		});
	}
};

exports.messages = async (req, res, next) => {
	try {
		let messages = [];
		if (res.locals.user) {
			let array = res.locals.user.interestedBooks || [];
			const books = await Book.find();

			books.forEach((book) => {
				if (array.includes(book._id) && book.NoofBooks > 0) {
					let bid;
					array.forEach((id) => {
						if (id == book._id) {
							bid = id;
						}
					});
					messages.push(bid);
				}
			});
			res.locals.user.messages = [];
			res.locals.user.messages.push(...messages);

			await User.findByIdAndUpdate(res.locals.user._id, res.locals.user);

			return next();
		}
		return next();
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: err.message,
		});
	}
};
