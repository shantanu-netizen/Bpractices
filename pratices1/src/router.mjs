import mongoose from "mongoose";
import express from "express"
import { login, user } from "./controllers/userControllers.mjs";
const router = express.Router()
router.get("/", (req, res) => {
    return res.status(200).send({ message: "done" });
})
router.post("/user", user)
router.post("/login",login)
export default router;