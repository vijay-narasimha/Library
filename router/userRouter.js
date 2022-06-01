const express=require('express');
const userController=require("../controllers/userController")
const Router=express()

Router.post('/register',userController.register)
Router.post('/login',userController.login)
Router.get('/logout',userController.logout)
module.exports=Router;