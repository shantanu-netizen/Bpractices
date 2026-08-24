import mongoose, { Query } from "mongoose";
import bookModel from "../models/book.mjs";
import userModel from "../models/user.mjs";
import reviewModel from "../models/review.mjs";
const createBook = async (req, res) => {
  try {
    const data = req.body;
    const { userId } = data;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: "userId is not valid" });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).send({ message: "user not found" });
    }
    const book = await bookModel.create(data);
    return res
      .status(201)
      .send({ message: "create file successfully", data: book });
  } catch (error) {
    if (error.message.includes("duplicate")) {
      return res.status(400).send({ status: false, error: error.message });
    } else if (error.message.includes("validation")) {
      return res.status(400).send({ status: false, error: error.message });
    } else {
      return res.status(500).send({ status: false, error: error.message });
    }
  }
};
const getBook = async (req, res) => {
  try {
    const { userId, subcategory, category } = req.query;
    const query = {};
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ message: "userId is not valid" });
      }
      query.userId = userId;
    }
    if (category) {
      query.category = category;
    }
    if (subcategory) {
      query.subcategory = subcategory;
    }
    const book = await bookModel
      .find(query)
      .select("_id title excerpt userId category releasedAt reviews");
    if (book.length == 0) {
      return res.status(400).send({ message: "userId is not valid" });
    }
    return res.status(200).send({ message: "book list", data: book });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};
const getBookId = async (req, res) => {
  try {
    const { bookId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).send({ message: "bookId is not valid" });
    }
    const book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(400).send({ message: "book not found" });
    }
    return res.status(200).send({
      status: true,
      message: "book details",
      data: book,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const putBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const data = req.body;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(404).send({ message: "book id is not valid" });
    }
    const oldbook = await bookModel.findById(bookId);
    if (oldbook == null) {
      return res.status(404).send({ message: "old book is not found" });
      }
      const book = await bookModel.findByIdAndUpdate(bookId, { $set: data })
      return res.status(201).send({message:"Data fetch succesfully"})
  } catch (error) {
       if (error.message.includes("duplicate")) {
         return res.status(400).send({ status: false, error: error.message });
       } else if (error.message.includes("validation")) {
         return res.status(400).send({ status: false, error: error.message });
       } else {
         return res.status(500).send({ status: false, error: error.message });
       }
  }
};
const deleteBook = async (req, res) => {
  try {
    let { bookId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res
        .status(400)
        .send({ status: false, error: "book id is not valid" });
    }
    await booksModel.findByIdAndUpdate(bookId, {
      $set: { isDeleted: true, deletedAt: Date.now() },
    });
    return res
      .status(200)
      .send({ status: true, message: "book deleted successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
export { createBook, getBook, getBookId, putBook, deleteBook };
