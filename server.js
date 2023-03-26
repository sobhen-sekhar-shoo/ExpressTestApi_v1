const express = require("express");
const server = express();
const cors = require("cors");
const db = require("./Connections/DB/DB_Connect")
const dotenv = require('dotenv');
dotenv.config();
const env = process.env;
const PORT = env.PORT;
const App_Router = require("./Routers/router");



server.use(cors());
server.use(express.json());



server.get("/", (req, res) => {
  res.status(200).sendFile(`${__dirname}/index.html`);
});

// set middleware and router setup 
server.use("/Api/V_1", App_Router);


let app = server.listen( PORT , (error) => {
  if (error) {
    console.error(error);
  } else {
    let host = app.address().address;
  
    // console.log("Example app listening at http://%s:%s", host, port)
    // console.log(`Your Api listening at http://${host}${port}`)
    console.log(`Your Api listening at http://localhost:${PORT}`);
  };
});
