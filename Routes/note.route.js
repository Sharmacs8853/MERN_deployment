const {Router} = require("express");

const note = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { noteModel } = require("../Models/note.model");

const validator = (req, res, next) => {
    const data_received = req.body;
    const { heading, note, tag } = data_received;

    if (!(heading && note && tag)) {
        return res.status(400).send("Some Filled is mIssing");
    }

    if (
        !(

            typeof heading == "string" &&
            typeof note === "string" &&
            typeof tag == "string"
        )
    ) {
        return res.status(400).send("validation iS failed");
    }
    next();
};

note.get("/get", async (req, res) => {
    const result = await noteModel.find({});
    res.send(result);
});

note.post("/create", validator, async (req, res)=>{
    const userTokenHeader = req.headers.authorization;
    jwt.verify(userTokenHeader, "secret", function (err, decoded){
        if(err){
            return res.send("connect to admin");
        }console.log(decoded);
    });
    try {
        const docs = await noteModel.insertMany([req.body]);
        res.send(docs)
    } catch (error) {
        return res.send(error)
    }
})

note.patch("/update/:id", async(req, res)=>{
    let {id}= req.params;
    let {heading, note, tag} = req.body;
    const userTokenHeader = req.headers.authorization;
    jwt.verify(userTokenHeader, "secret", function (err, decoded){
        if(err){
            return res.send("please login first to update");
        }
    })
    const docs = await noteModel.updateMany(
        {_id: id},
        {$set: {heading, note, tag}}
        );
        res.send(docs);
})
note.delete("/delete/:id", async(req, res)=>{
    const {id} = req.params;
    const userTokenHeader = req.headers.authorization;
    jwt.verify(userTokenHeader, "secret", function (err, decoded){
        if(err){
            return res.send("you are not authorized person to delete tha data");
        }console.log(decoded);
    })

    const docs = await noteModel.deleteOne({_id: id});
    res.send(docs)
})

module.exports = {note}


