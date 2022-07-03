const express = require("express");
const viewController = require("./../controllers/viewController");
const userController = require("../controllers/userController");

const Router = express.Router();
const bookController = require("../controllers/bookController");

Router.use(
	userController.isLoggedIn,
	bookController.saveBooks,
	bookController.messages,
);
Router.get("/", viewController.home);
Router.get("/login", viewController.login);

Router.get("/me", viewController.me);

//Router.get("/books", viewController.getAllBooks);
Router.get("/book/:slug", viewController.getBook);

Router.get("/signup", viewController.signup);
Router.get("/cart", viewController.cart);
Router.get("/savedbooks", viewController.savedBooks);
Router.get("/issuedbooks", viewController.issuedBooks);
Router.get("/interestedbooks", viewController.interestedBooks);
Router.get("/messages", viewController.messages);
Router.get("/bookdetails", viewController.bookdetails);
Router.get("/userdetails", viewController.userdetails);

Router.get("/:id", viewController.pages);
module.exports = Router;
