import mongoose from "mongoose";
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "this field id required"],
    },
    lname: {
      type: String,
      required: [true, "this field id required"],
    },
    email: {
      type: String,
      required: [true, "this field id required"],
      match: [regex, "Format is not correct"],
    },
    role: {
      type: String,
      required: [true, "this field id required"],
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "this field id required"],
    },
  },
  { timestamps: true },
);
const userModel = mongoose.model("user", userSchema);
export default userModel
