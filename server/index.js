//to use the express.js
const express = require("express");
const app= express()
const cookieParser= require("cookie-parser")

//
const mongoose = require("mongoose")
//import the router
const authRoute = require('./routes/AuthRoute.js')
const cors = require("cors") //to call apis from another url to our server
//setting up the server
app.listen(4000,() =>{
    console.log("Sever has Started on PORT 4000")
})
mongoose.connect("mongodb://localhost:27017/jwt").then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err.message)
})
app.use(cors());
//to get the json from apis
app.use(express.json());
app.use(cookieParser());
app.use("/",authRoute);
