import mongoose from "mongoose";
import express from "express"
import config from "./config.mjs";
import router from "./src/router.mjs";
import multer from "multer";
const app = express()
app.use(express.json())
app.use(multer().any())
mongoose.connect(config.uri).then(() => {
    console.log("your db is product")
}).catch((err) => {
    console.log(err)
})
app.use("/",router)
app.listen(config.port, () => {
     console.log(`your port is ${config.port}`);
})