import mongoose from "mongoose";
const Email=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const userSchema = new mongoose.Schema({
  fname: {type:String, mandatory:true},
  lname: {type:String, mandatory:true},
  email: {type:String, mandatory:true, Match:Email, unique:true},
  profileImage: {type:String, mandatory:true}, // s3 link
  phone: {type:String, mandatory:true, unique:true}, 
  password: {type:String, mandatory:true, minLen: 8, maxLen: 15},
  address: {
    shipping: {
      street: {type:String, mandatory:true},
      city: {type:String, mandatory:true},
      pincode: {type:String, mandatory:true}
    },
    billing: {
      street: {type:String, mandatory:true},
      city: {type:String, mandatory:true},
      pincode: {type:String, mandatory:true}
    }
  },
}
    , { timestamps: true })
const userModel = new mongoose.model('user', userSchema)
export default userModel