//This defines our schema (name, age, and email) in a User collection
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let validator = require('validator')

const UserSchema = new Schema({
  name: { type: String, required: false },
  age: { type: Number, required: false },
  email: { type: String, required: false },
});

module.exports = mongoose.model("User", UserSchema);