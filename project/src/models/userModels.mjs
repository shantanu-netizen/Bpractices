import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unqiue: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unqiue: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trime: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    WatchHistory: [
      {
        type: mongoose.Scheme.Types.ObjectId(),
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const userModels = new mongoose.model("user", userSchema);
export default userModels;
