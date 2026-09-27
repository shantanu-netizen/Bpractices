import mongoose from "mongoose";
const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
}, { timestamps: true })
const tweetModel = new mongoose.model("tweet", tweetSchema)
export default tweetModel