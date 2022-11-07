const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
  heading:{type: String, require: true},
  note:{type: String, require: true},
  tag:{type: String, require: true}
})

const noteModel = mongoose.model('note', noteSchema);

module.exports = {
    noteModel
}