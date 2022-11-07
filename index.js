const express = require('express');
const mongoose = require('mongoose');
const {connection} = require("./Config/db")
const {UserModel} = require("./Models/auth.model");
const user = require("./Routes/user.route");
const {note} = require("./Routes/note.route");

const app = express();
app.use(express.json())
app.get("/",(req, res)=>{
    res.send("welcome to home page")
})

app.use("/user", user);
app.use("/note", note )


app.listen(8080, async()=>{
    try {
        await connection;
        console.log("connected");
    } catch (error) {
        console.log("not connected ", error);
    }
    console.log("server listen on 8080");
})