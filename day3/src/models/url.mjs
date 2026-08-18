import mongoose from "mongoose";
const url = new mongoose.Schema({
  urlcode: {
    type: "String",
    unique: true,
    required: true,
    lowercase: true,
  },
  longurl: {
    type: "String",
    unique: true,
    required: true,
    valdiate: function (v) {
      return /^https?:\/\/.+/.test(v);
    },
    message: "Invalid URL",
  },
  shorturl: {
    type: "String",
    unique: true,
    required: true
  }
}, { timestamps: true });
export default mongoose.model("Url", url);
