import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema({
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
}, { timestamps: true });
const subscriptionModel =new mongoose.model("subscription", subscriptionSchema)
export default subscriptionModel