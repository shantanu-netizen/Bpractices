import bookModel from "../models/book.mjs";
import reviewModel from "../models/review.mjs";
import mongoose from "mongoose";
const createReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const data = req.body;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).send({ message: "book id is not valid" });
    }
    const book = await bookModel.findById({ _id: bookId });
    if (!book) {
      return res.status(400).send({ message: "book is not found" });
    }
    const review = await reviewModel.create(data);
    return res
      .status(200)
      .send({ message: "data created succesfully", data: review });
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
const updateReview = async (req, res) => {
  try {
    const { bookId, reviewId } = req.params;
    const data = req.body;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).send({ message: "book id is not valid" });
    }
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).send({ message: "review id is not valid" });
    }
    const book = await bookModel.findById({ _id: bookId });
    if (!book) {
      return res.status(400).send({ message: "book is not found" });
    }
    const review = await reviewModel.findById({
      _id: reviewId,
      bookId: bookId,
    });
    if (!review) {
      return res.status(400).send({ message: "review is not found" });
    }
    const update = await reviewModel.findByIdAndUpdate(reviewId, {
      $set: "data",
    });
    return res
      .status(200)
      .send({ message: "Update successfully", data: update });
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
const deleteReview = async (req, res) => {
  try {
    let { bookId, reviewId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res
        .status(400)
        .send({ status: false, error: "book id is not valid" });
    }
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res
        .status(400)
        .send({ status: false, error: "review id is not valid" });
    }
    let book = await bookModel.findOne({ _id: bookId, isDeleted: false });
    if (!book) {
      return res.status(404).send({ status: false, error: "book not found" });
    }
    let review = await reviewModel.findOne({
      _id: reviewId,
      bookId: bookId,
      isDeleted: false,
    });
    if (!review) {
      return res.status(404).send({ status: false, error: "review not found" });
    }
    await reviewModel.findByIdAndDelete(reviewId);
    await bookModel.findByIdAndUpdate(bookId, { $inc: { reviews: -1 } });
    return res
      .status(200)
      .send({ status: true, message: "review deleted successfully" });
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
export {createReview,updateReview,deleteReview}