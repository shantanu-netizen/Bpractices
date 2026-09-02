import express from "express"
import { getUser, login, putUser, register } from "./controllers/userControllers.mjs"
import { authentation } from "./auth/auth.mjs"
const router = express.Router()
router.post("/", register)
router.post("/login", login)
router.get("/get", getUser,authentation)
router.put("/put",putUser)
export default router