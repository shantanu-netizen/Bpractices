import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import config from "./config.mjs";
import router from "./src/router.mjs";
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

mongoose
  .connect(config.uri)
  .then(() => {
    console.log("i connected my data base");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", router);
app.listen(config.port, () => {
  console.log(`port is ${config.port}`);
});
