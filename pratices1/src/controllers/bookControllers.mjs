import { Query } from "mongoose";
import bookModel from "../models/book.mjs";
import userModel from "../models/user.mjs";
const createBook = async (req, res) => {
    try {
        const data = req.data
        const { userId } = data
        if (!mongoose.Type.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: "userId is not valid" })
        }
        const user = await userModel.findById(user)
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
            if (!mongoose.Type.ObjectId.isValid(userId)) {
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
export {createBook,getBook}