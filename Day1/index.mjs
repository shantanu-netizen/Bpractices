import mongoose from "mongoose";
import express from "express"
import router from "./src/router.mjs";
import config from "./config.mjs";
const app = express()
app.use(express.json())
mongoose.connect(config.uri).then(() => {
    console.log("you connect with db")
}).catch((err) => {
    console.log(err)
})
app.use("/",router)
app.listen(config.port, () => {
    console.log(`this is my port ${config.port}`);
})