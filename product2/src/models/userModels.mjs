import mongoose from "mongoose";
const Email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, Match: Email, unique: true },
    profileImage: { type: String, required: true }, // s3 link
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLen: 8, maxLen: 15 },
    address: {
      shipping: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true },
      },
      billing: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true },
      },
    },
  },
  { timestamps: true },
);
const userModel = new mongoose.model("user", userSchema);
export default userModel;
