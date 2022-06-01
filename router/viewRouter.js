const express=require('express')
const viewController=require('./../controllers/viewController')
const userController=require('../controllers/userController')
const { Route } = require('express')
const Router=express.Router()


Router.use(userController.isLoggedIn)
Router.get('/',viewController.home)
Router.get('/me',viewController.me)
Router.get('/books',viewController.getAllBooks)
Router.get('/book/:slug',viewController.getBook)
Router.get('/login',viewController.login)
Router.get('/signup',viewController.signup)
Router.get("/savedbooks",viewController.savedBooks)
module.exports=Router;