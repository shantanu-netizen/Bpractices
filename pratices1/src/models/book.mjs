import mongoose from "mongoose";
const bookSchema = mongoose.Schema({
  title: {type:String, mandatory:true, unique:true},
  excerpt: {type:String, mandatory:true}, 
  userId: {type:mongoose.Schema.Types.ObjectId, mandatory:true,ref:'user'},
  ISBN: {type:String, mandatory:true, unique:true},
  category: {type:String, mandatory:true},
  subcategory: {type:String, mandatory:true},
  reviews: {type:Number, default: 0},
  deletedAt: {type:Date, default: null}, 
  isDeleted: {type:Boolean, default: false},
  releasedAt: {type:Date, mandatory:true},
}, { timestamp: true })
const bookModel = mongoose.model('book', bookSchema)
export default bookModel;