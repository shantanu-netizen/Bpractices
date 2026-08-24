import mongoose, { Query } from "mongoose";
import bookModel from "../models/book.mjs";
import userModel from "../models/user.mjs";
import reviewModel from "../models/review.mjs";
const createBook = async (req, res) => {
    try {
        const data = req.body
        const { userId } = data
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: "userId is not valid" })
        }
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(400).send({ message: "user not found" });
        }
        const book = await bookModel.create(data)
        return res.status(201).send({message:"create file successfully", data:book})
    } catch (error) {
         if (error.message.includes('duplicate')) {
            return res.status(400).send({ status: false, error: error.message })
        } else if (error.message.includes('validation')) {
            return res.status(400).send({ status: false, error: error.message })
        } else {
            return res.status(500).send({ status: false, error: error.message })
        }
    }
}
const getBook = async (req, res) => {
    try {
        const { userId, subcategory, category } = req.query
        if (userId) {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).send({message:"userId is not valid"})
            }
            query.userId=userId
        }
        if (category) {
            query.category=category
        }
        if (subcategory) {
            query.subcategory=subcategory
        }
        const book = await bookModel
          .find(query)
            .select("_id title excerpt userId category releasedAt reviews");
        if (book.length == 0) {
             return res.status(400).send({ message: "userId is not valid" });
        }
        return res.status(200).send({message:"book list",data:book})
    } catch (error) {
         return res.status(500).send({ status: false, error: error.message });
    }
}
const getBookId = async (res, req) => {
    try {
      const { bookId } = req.param;
      if (!mongoose.Type.ObjectId.isValid(bookId)) {
        return res.status(400).send({ message: "bookId is not valid" });
      }
      const book = await bookModel.find(bookId);
      if (!book) {
        return res.status(400).send({ message: "book not found" });
      }
      let reviews = await reviewModel
        .find({ bookId: bookId })
        .select("_id reviewedBy bookId reviewedAt rating review");
      return res
        .status(200)
        .send({
          status: true,
          message: "book details",
          data: { ...book._doc, reviewsData: reviews },
        });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
}
export {createBook,getBook,getBookId}