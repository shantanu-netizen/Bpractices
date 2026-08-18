import mongoose from "mongoose"
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const author = new mongoose.model({
  fname: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    match: [regex, "please filled valid"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    },
}, { timestamps: true });
const authorModel = mongoose.Model("author", author)
export default authorModel