import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        req:true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Video"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})
commentSchema.plugin(mongooseAggregatePaginate);
const commentModel = new mongoose.model("comment", commentSchema)
export default commentModel