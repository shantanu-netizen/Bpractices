import express from "express"
import { getUser, login, putUser, register } from "./controllers/userControllers.mjs"
const router = express.Router()
router.post("/", register)
router.post("/login", login)
router.get("/get", getUser)
router.put("/put",putUser)
export default router