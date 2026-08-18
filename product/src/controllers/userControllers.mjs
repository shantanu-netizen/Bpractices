import userModel from "../models/user.mjs";
import config from "../../config.mjs";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const registerUser = async (req, res) => {
    try {
        const { fname, lname, email, phone, password } = req.body
        const existingUser = new userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).send({message:"User already exist"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const files = req.files
        if (!files || files.length == 0) {
            return res
              .status(404)
              .send({ message: "Profile picture is required" });
        }
        const profileImage = await uploadFile(files[0])
        if (!profileImage) {
            return res
              .status(404)
              .send({ message: "Failed to upload profile picture" });
        }
        const user = new userModel.create({
          fname,
          lname,
          email,
          phone,
          password:hashedPassword
        });
        await user.save()
        return res.status(201).send({ message: "user created sucessfully" })
    } catch (err) {
         if (error.message.includes("validation")) {
           return res
             .status(400)
             .send({ message: "failed", error: error.message });
         } else if (error.message.includes("duplicate")) {
           return res
             .status(400)
             .send({ message: "failed", error: error.message });
         } else {
           return res
             .status(500)
             .send({ message: "failed", error: "Internal Server Error" });
         }
    }
}
const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res
        .status(404)
        .send({ message: "Invalid credential" });
    }
    const token = jwt.sign({ id: user_.id, email: user.email }, config.token)
    if (!token) {
       return res
         .status(500)
         .send({ message:"Internal Server Error" });
    }
    return res.status(200).send({message:"succesfull for login"})
  } catch (error) {
    return res
      .status(500)
      .send({ message: "failed", error: "Internal Server Error" });
  }
}
export {registerUser,Login}