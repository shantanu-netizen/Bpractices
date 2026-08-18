import express from 'express'
import { getuser, login, updateuser, userpost } from './controllers/controller.mjs'
import authenticate from './auth/auth.mjs'
const router = express.Router()
router.get('/', (req, res) => {
    return res.status(200).send({message:"ok"})
})
router.post("/", userpost)
router.post("/login", login)
router.get("/id",authenticate, getuser)
router.put("/id", authenticate, updateuser);
export default router