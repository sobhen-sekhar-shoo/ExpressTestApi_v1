const express = require("express");
const server = express();
const cors = require("cors");
const db = require("./Connections/DB/DB_Connect");
const dotenv = require("dotenv");
dotenv.config();
const env = process.env;
const PORT = env.PORT;
const App_Router = require("./Routers/router");
const fs = require("fs");

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).sendFile(`${__dirname}/index.html`);
});


server.get("/video", (req, res) => {
  const range = req.headers.range;
  console.log(range);
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
    "Content-Range": `bytes ${start_num}-${end_num}/${V_Size}`,
    "Accept-Ranges": "bytes",
    "Content-Length": content_length,
    "Content-Type": "video/mp4"
  }
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(V_Path, {start_num, end_num});
  videoStream.pipe(res);
  console.log(res)
});

// set middleware and router setup
// server.use("/Api/V_1", App_Router);

let app = server.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    let host = app.address().address;

    // console.log("Example app listening at http://%s:%s", host, port)
    // console.log(`Your Api listening at http://${host}${port}`)
    console.log(`Your Api listening at http://localhost:${PORT}`);
  }
});
