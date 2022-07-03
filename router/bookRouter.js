const express = require("express");
const bookController = require("./../controllers/bookController");
const userController = require("../controllers/userController");
const Router = express.Router();

Router.route("/")
	.get(bookController.getAllBooks)
	.post(bookController.createBook);

Router.route("/:id")
	.get(bookController.getBook)
	.delete(bookController.deleteBook);

Router.get("/payment/:mode", userController.isLoggedIn, bookController.payment);

module.exports = Router;
