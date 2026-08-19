import mongoose from "mongoose";
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userSchema = mongoose.Schema(
  {
    title: { type: String, mandatory: true, enum: ["Mr", "Mrs", "Miss"] },
    name: { type: String, mandatory: true },
    phone: { type: String, mandatory: true, unique: true },
    email: {
      type: String,
      mandatory: true,
      match: [regex, "Fill valid email"],
      unique: true,
    },
    password: { type: String, mandatory: true, minLen: 8, maxLen: 15 },
    address: {
      street: { type: String },
      city: { type: String },
      pincode: { type: String },
    },
  },
  { timestamps: true },
);
const userModel = mongoose.model("user", userSchema);
export default userModel
