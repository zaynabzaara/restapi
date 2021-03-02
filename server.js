const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("./models/user");
require('dotenv').config()

// initiate express() and set bodyParser to use JSON:
const app = express();
app.use(bodyParser.json());

//App . use
var userssRouter= router;
app.use("/users", userssRouter);

//We’ll be using mongoose to connect to the database.
const db = "mongodb://localhost/mydatabase";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


    //GET:  request that returns all users in JSON format
    router.get("/", (req, res) => {
        User.find()
          .then((users) => res.json(users))
          .catch((err) => res.status(400).json("Error: " + err));
      });


  //POST
  router.post("/add", (req, res) => {
    const newUser = new User({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    });
    newUser
    .save()
    .then(() => res.json("User Added..."))
    .catch((err) => res.status(400).json("Error: " + err));
});

    //UPDATE : update a student record with the matching _id.
    router.put("/update/:id", (req, res) => {
        User.findById(req.params.id)
          .then((User) => {
            User.name = req.body.name;
            User.age = req.body.age;
            User.email = req.body.email;
            User
              .save()
              .then(() => res.json("Student Updated..."))
              .catch((err) => res.status(400).json("Error: " + err));
          })
          .catch((err) => res.status(400).json("Error: " + err));
      });


    //Delete a user record that has the matching _id:
    router.delete("/delete/:id", (req, res) => {
        User.findByIdAndRemove(req.params.id)
          .then(() => res.json("user Deleted..."))
          .catch((err) => res.status(400).json("Error: " + err));
      });


//App . use
var userssRouter= router;
app.use("/users", userssRouter);

// tell the app to listen on port 5000 and log a message when the server is running

app.listen(3000, () => console.log("Server Running"));
module.exports = router;