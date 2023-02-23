const express = require("express");
const conection = require("./config/db");
require("dotenv").config();

const { userRouter } = require("./router/user.router.js");
const { flightRouter } = require("./router/flight.router");

const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api", userRouter);
app.use("/api", flightRouter);

app.listen(process.env.port, async () => {
  try {
    await conection;
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
  }

  console.log(`server is listening on ${3100}`);
});
