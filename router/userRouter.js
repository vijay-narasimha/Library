const express=require('express');
const userController=require("../controllers/userController")
const Router=express()

Router.post('/register',userController.register)
Router.post('/login',userController.login)
Router.get('/logout',userController.logout)
Router.get('/savebook/:id',userController.isLoggedIn,userController.saveBook)
module.exports=Router;