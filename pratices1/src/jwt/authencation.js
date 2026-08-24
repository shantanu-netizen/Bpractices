import jwt from "jsonwebtoken"
import config from "../../config.mjs";
import mongoose from "mongoose";
import bookModel from "../models/book.mjs";
const authentication = async (req, res, next) => {
  try {
    let token = req.Header.authorization;
    if (!token) {
      return res.status(400).send({ message: "token is required" });
    }
    token = token.split(" ")[1];
    let decoded = jwt.verify(token, config.secretToken, (err, decodedToken) => {
      if (err) {
        return res.status(400).send({ message: "Invalid Token" });
      }
      return decodedToken;
    });
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }
};
const authorisation = async (req, res, next) => {
  try {
    const userId = req.decoded.userId;
    const bookId = req.param.bookId;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).send({ status: false, error: error.message });
    }
    const book = await bookModel.find({ _id: bookId });
    if (!book) {
      return res.status(404).send({ status: false, message: "book not found" });
    }
    if (userId !== book.userId.toString()) {
      return res
        .status(403)
        .send({
          status: false,
          error: "you are not authorized to access this resource",
        });
    }
    next();
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};
export { authentication, authorisation };