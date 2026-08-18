import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Fname is mandatory"],
  },
  email: {
    type: String,
    required: [true, "email is mandatory"],
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is mandatory"],
    },
  
}, { timestamp: true })
const userModel = mongoose.model("user", userSchema)
export default userModel