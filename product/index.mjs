import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import config from './config.mjs'
import router from './src/router.mjs'
const app = express()
app.use(express())
app.use(multer().any())
mongoose.connect(config.mongoose).then(() => {
    console.log("connected with DB")
}).catch((err) => {
    console.log(err)
});
app.use('/', router)
app.listen(config.port, () => {
    console.log(`your port is ${config.port}`)
})