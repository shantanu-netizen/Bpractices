import express from "express";
import { getuser, login, register, update } from "./contollers/contoller.mjs";
import { authenticateToken, authorization } from "./auth/auth.mjs";

const router = express.Router();
router.get("/", (req, res) => {
  return res.status(200).send({ message: "done" });
});
router.post("/register", register);
router.post("/login", login);
router.get("/get/:id", authenticateToken, getuser);
router.put("/up/:id",authenticateToken,authorization,update)
export default router;
