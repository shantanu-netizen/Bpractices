import mongoose from "mongoose";
import express from "express"
import { login, user } from "./controllers/userControllers.mjs";
import { createBook, deleteBook, getBook, getBookId, putBook } from "./controllers/bookControllers.mjs";
const router = express.Router()
router.get("/", (req, res) => {
    return res.status(200).send({ message: "done" });
})
router.post("/user", user)
router.post("/login", login)
router.post("/createbook",createBook)
router.get('/book', getBook)
router.get('/book/:bookId', getBookId);
router.put('book/:updateById', putBook);
router.delete("book/:deleteById", deleteBook);
export default router;