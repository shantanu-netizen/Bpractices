import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: [true, "fname is mandatory"] },
    lname: { type: String, required: [true, "lname is mandatory"] },
    email: {
      type: String,
      required: [true, "email is mandatory"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      unique: true,
    },
    profileImage: {
      type: String,
      required: [true, "Profile image S3 link is mandatory"],
    },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: [8], maxLength: [15] }, // encrypted password
  },
  { timestamps: true },
);
const userModel = new mongoose.model('user', userSchema)
export default userModel;