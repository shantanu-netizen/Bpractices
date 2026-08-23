import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  bookId: {type:mongoose.Schema.Types.ObjectId, mandatory:true, refs: 'book'},
  reviewedBy: {type:String, mandatory:true, default: 'Guest'},
  reviewedAt: {type:Date, mandatory:true},
  rating: {type:Number, min: 1, max: 5, mandatory:true},
  review: {type:String},
  isDeleted: {type:Boolean, default: false},
}, { timestamps: true })
const reviewModel = new mongoose.model('review', reviewSchema)
export default reviewModel;