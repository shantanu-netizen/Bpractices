import mongoose from "mongoose";
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      match: [regex, "please filled valid"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    dob: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const userModel = mongoose.model("user", userSchema);
export default userModel;
