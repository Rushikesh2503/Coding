const express = require("express");
const connect = require("./configs/db");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const studentController = require("./controllers/student.controller");

app.use("/students", studentController);

const start = async () => {
  await connect();
  app.listen("3100", () => {
    console.log("Listening on port 3100");
  });
};

start();
