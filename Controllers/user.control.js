const User = require("../Models/user.model");
const fs = require("fs");

const getAllVideo = async (req, res) => {
  // res.status(200).send("hello users");
  res.status(200).json({ msg : "hello users"});
};


const TestVideo = async (req, res) => {
  console.log("in")
 const range = req.headers.range;
 if(!range){
  res.status(400).send("Requires Range header");
 }
 const V_Path = "\videos\madi_chaala_intro.mp4";
 const V_Size = fs.statSync(V_Path).size;
 console.log("size :", V_Size)
};

const AddUser = async (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports = { getAllVideo, AddUser, TestVideo };
