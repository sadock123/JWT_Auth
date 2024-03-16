const UserModel = require("../models/UserModel.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const maxAge=3*24*60*60;
const createToken =(id)=>{
    return jwt.sign({id},"sadock",{
        expiresIn:maxAge,
    })
}
const handleErrors = (err)=>{
    let errors = {email:"",password:""}
    if ((err.code)===11000){
        errors.email = "Email is already registered"
        return errors
    }
    
}
module.exports.register = async(req,res,next)=>{
    try {
        const {email,password}= req.body
        if (email===""){
            return res.json({created:false, msg:"No email is there",errors:true})
        }
        if (password===""){
            return res.json({created:false, msg:"No password is there",errors:true})
        }
        const confirmUser = await UserModel.findOne({email})
        if (confirmUser){
            return res.json({created:false, msg:"Email is already in use",errors:true})
        }
        console.log(req.body)
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await UserModel.create({email, password:hashedPassword,});
        console.log(user)
        const token = createToken(user._id);
        console.log(token)
        res.cookie("jwt",token, {
            withCredentials:true,
            httpOnly:false,
            maxAge:maxAge*1000,
        })
       
        res.status(201).json({user: user._id,created:true})
    } catch (error) {
        console.log(error)
        const errors = handleErrors(error);
        res.json({errors,created:false})

    }
};

module.exports.login = async(req,res,next)=>{
    try {
        const {email,password}= req.body
        const user = await UserModel.findOne({email});
        // const token = createToken(user._id);
        console.log(user)
        // res.cookie("jwt",token, {
        //     withCredentials:true,
        //     httpOnly:false,
        //     maxAge:maxAge*1000,
        // })
        if (!user){
            console.log("incorrect email")
            return res.json({msg:"Incorrect Username",status:false})
        }
        if (user){
            const compareUser = await bcrypt.compare(password, user.password)
            if (!compareUser){
                return res.json({msg:"Incorrect Password",status:false})
            }
            else{
                return res.json({status:true,user: user._id})
            }
        }
    } catch (error) {
        console.log(error)
        const errors = handleErrors(error);
        res.json({errors,created:false})

    }
};
