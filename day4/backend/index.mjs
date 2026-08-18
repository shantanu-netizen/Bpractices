import mongoose from "mongoose";
import express from "express";
import config from "./config.mjs";
import router from "./src/router.mjs";
const app = express()
app.use(express.json())
mongoose.connect(config.uri).then(() => {
    console.log("connected with db")
}).catch((err) => {
    console.log(err)
})
app.use('/', router)
app.listen(config.port, () => {
    console.log(`your port is ${config.port}`)
})