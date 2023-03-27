const User = require("../Models/user.model");
const fs = require("fs");

const getAllVideo = async (req, res) => {
  // res.status(200).send("hello users");
  res.status(200).json({ msg: "hello users" });
};

const TestVideo = (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  const V_Path = "././Videos/madi_chaala_intro.mp4";
  const V_Size = fs.statSync(V_Path).size;
  console.log("size :", V_Size);
  const CHUNK_SIZE = 10**6; // 1MB
  const start_num = Number(range.replace(/\D/g, ""));
  const end_num = Math.min(start_num + CHUNK_SIZE , V_Size - 1);
  const content_length = start_num - end_num + 1;
  const headers = {
    "Content-Range": `bytes ${start_num} - ${end_num} / ${V_Size}`,
    "Accept-Ranges": "bytes",
    "Content-Length": content_length,
    "Content-Type": "video/mp4"
  }
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(V_Path, {start_num, end_num});
  videoStream.pipe(res);
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
