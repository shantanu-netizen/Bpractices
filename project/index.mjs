import mongoose from "mongoose";
import express from "express";
import config from "./config.mjs";
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(config.uri)
  .then(() => {
    console.log("you connect to db");
  })
  .catch((err) => console.log(err));
app.listen(config.port, () => {
    console.log(`your port is ${config.port}`)
})