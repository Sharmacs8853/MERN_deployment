const {Router, json} = require('express');
const {UserModel} = require("../Models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const user = Router();

user.post("/signup", (req, res)=>{
    let {email, password, age} = req.body;
    bcrypt.hash(password, 3).then(async function(hash){
        var user = new UserModel({
            email,
            password: hash,
            age
        });
        await user.save();
        res.send("signup successfull");
    }).catch((err)=>{
        console.log(err);
    })
})

user.post("/login", async (req, res)=>{
    let {email, password} = req.body;
    const userInfo = await UserModel.findOne({email});
    const hash_password = userInfo.password;
    bcrypt.compare(password, hash_password, function(err, response){
        if(response){
            var token = jwt.sign({email: email}, "secret");
            res.send({"msg":"login successfully", "token": token})
        }else{
            res.send("Login failed")
        }
    })
})

module.exports = user