const express = require("express");
const userController = require("../controllers/userController");
const Router = express();

Router.post("/register", userController.register);
Router.post("/login", userController.login);
Router.get("/logout", userController.logout);

Router.get("/savebook/:id", userController.isLoggedIn, userController.saveBook);
Router.get("/addcart/:id", userController.isLoggedIn, userController.addCart);

Router.get(
	"/removecart/:id",
	userController.isLoggedIn,
	userController.removeCart,
);
Router.get(
	"/addinterest/:id",
	userController.isLoggedIn,
	userController.addInterest,
);
Router.get(
	"/removeinterest/:id",
	userController.isLoggedIn,
	userController.removeInterest,
);
Router.get("/cancelpass/:id", userController.cancelPass);
Router.get("/acceptpass/:id", userController.acceptPass);

module.exports = Router;
